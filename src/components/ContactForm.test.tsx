import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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
