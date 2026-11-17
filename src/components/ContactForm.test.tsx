import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Toaster } from '@/components/ui/toaster';
import ContactForm from './ContactForm';

const fillForm = () => {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.org' } });
  fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Hello' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Testing the form' } });
};

const mockFetch = (body: unknown, status = 200) =>
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(body), { status }));

describe('ContactForm', () => {
  it('sends the message to Web3Forms with the access key, reply-to email and honeypot', async () => {
    const fetchSpy = mockFetch({ success: true, message: 'Email sent successfully!' });
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledOnce());
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(init?.method).toBe('POST');
    const payload = JSON.parse(String(init?.body));
    expect(payload).toMatchObject({
      access_key: 'test-access-key',
      name: 'Ada Lovelace',
      email: 'ada@example.org',
      subject: 'Portfolio: Hello',
      message: 'Testing the form',
      botcheck: false,
    });

    // Success clears the form.
    await waitFor(() => expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe(''));
  });

  it('keeps what the visitor typed when sending fails', async () => {
    const fetchSpy = mockFetch({ success: false, message: 'Invalid access key' }, 400);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));

    // Wait until the failure has actually been handled (the catch block logs it).
    await waitFor(() => expect(errorSpy).toHaveBeenCalledWith('Error submitting contact form:', expect.any(Error)));
    expect(fetchSpy).toHaveBeenCalledOnce();
    expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe('Testing the form');
    expect((screen.getByRole('button', { name: /Send Message/ }) as HTMLButtonElement).disabled).toBe(false);
  });
});

describe('ContactForm toasts', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const renderWithToaster = () =>
    render(
      <>
        <ContactForm />
        <Toaster />
      </>,
    );

  it('shows "Message sent!" after submitting, then hides it after a few seconds', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockFetch({ success: true, message: 'Email sent successfully!' });
    renderWithToaster();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));

    expect(await screen.findByText('Message sent!')).toBeTruthy();
    expect(screen.getByText("Thank you for your message. I'll get back to you soon.")).toBeTruthy();

    // Still visible shortly before its 4 s duration ends...
    await act(async () => {
      vi.advanceTimersByTime(3500);
    });
    expect(screen.queryByText('Message sent!')).not.toBeNull();

    // ...and gone once the duration and the removal delay have passed.
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    await waitFor(() => expect(screen.queryByText('Message sent!')).toBeNull());
  });

  it('shows an error toast with the fallback email when sending fails', async () => {
    mockFetch({ success: false, message: 'Invalid access key' }, 400);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    renderWithToaster();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));

    expect(await screen.findByText('Message not sent')).toBeTruthy();
    expect(screen.getByText(/talk2muhammadbello@gmail\.com/)).toBeTruthy();
  });
});
