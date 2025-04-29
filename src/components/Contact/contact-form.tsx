'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setDate(undefined);

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Full Name
            {' '}
            <span className="text-green-500">*</span>
          </Label>
          <Input id="name" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email
            {' '}
            <span className="text-green-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Preferred Tour Date (optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Select a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={date => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message
          {' '}
          <span className="text-green-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us about your travel plans or questions..."
          rows={5}
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
        {isSubmitting
          ? (
              <>Processing...</>
            )
          : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {' '}
                Send Message
              </>
            )}
      </Button>

      {isSubmitted && (
        <div className="p-3 bg-green-50 text-green-600 rounded-md">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
    </form>
  );
}
