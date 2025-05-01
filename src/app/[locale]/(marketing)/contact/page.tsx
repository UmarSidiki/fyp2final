import ContactForm from '@/components/Contact/contact-form';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="container px-10 py-12 mx-auto">
        {/* Hero Section */}
        <div className="relative w-full h-64 mb-8 overflow-hidden rounded-xl">
          {/* <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Beautiful travel destination"
            fill
            className="object-cover"
            priority
          /> */}
          <div className="absolute " />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl font-bold mb-2  md:text-4xl  bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">Let's Plan Your Next Adventure Together</h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300 ">We're here to make your travel dreams come true</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Contact Information */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <p className="mb-6 text-muted-foreground">
                Have questions about our tours? Looking to book a custom adventure? Our team of experienced travel
                guides is ready to help you plan the perfect journey.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-emerald-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Our Office</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Adventure Lane, Traveler's District, Exploreville
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 text-emerald-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 text-emerald-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">hello@adventuretours.com</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="p-2 bg-sky-100 rounded-full text-sky-600 hover:bg-sky-200 transition-colors">
                  <Facebook className="w-5 h-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://wa.me/15551234567"
                  className="p-2 bg-green-100 rounded-full text-green-600 hover:bg-green-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M9.5 13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5Z" />
                  </svg>
                  <span className="sr-only">WhatsApp</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        {/* <Card className="mt-8">
          <CardContent className="p-0">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s123%20Example%20St%2C%20New%20York%2C%20NY%2010006!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="w-full h-full"
              >
              </iframe>
            </div>
          </CardContent>
        </Card> */}

        {/* Featured Destinations */}
        {/* <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Machu Picchu, Peru', 'Santorini, Greece', 'Kyoto, Japan', 'Serengeti, Tanzania'].map(
              (destination, index) => (
                <div key={index} className="relative h-40 rounded-lg overflow-hidden group">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=${encodeURIComponent(destination)}`}
                    alt={destination}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                    <p className="text-white font-medium text-sm">{destination}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
