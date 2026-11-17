
import { useState } from 'react';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const FALLBACK_EMAIL = 'talk2muhammadbello@gmail.com';
// How long the confirmation toasts stay on screen before closing by themselves.
// Errors stay a little longer so there's time to read the fallback email address.
const SUCCESS_TOAST_MS = 4000;
const ERROR_TOAST_MS = 6000;

const emptyForm = { name: '', email: '', subject: '', message: '' };

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(emptyForm);
  // Honeypot: hidden from people, bots tick it, Web3Forms then drops the submission.
  const [botcheck, setBotcheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!WEB3FORMS_KEY) {
        throw new Error('VITE_WEB3FORMS_KEY is not set');
      }

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...formData, // `email` becomes the reply-to address
          subject: `Portfolio: ${formData.subject}`,
          from_name: 'Portfolio contact form',
          botcheck,
        }),
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || `Web3Forms error (HTTP ${response.status})`);
      }

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        duration: SUCCESS_TOAST_MS,
      });
      setFormData(emptyForm);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Message not sent",
        description: `Something went wrong. Please email me directly at ${FALLBACK_EMAIL}.`,
        variant: "destructive",
        duration: ERROR_TOAST_MS,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="Your name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="Subject of your message"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          placeholder="Your message..."
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium transition-all hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed active:translate-y-0.5"
      >
        {isSubmitting ? (
          <>Processing</>
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
