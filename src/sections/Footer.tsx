import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Send,
  MapPin,
  Mail,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Product: ['Features', 'Pricing', 'AI Tutor', 'Mobile App'],
  Resources: ['Blog', 'Thai Guide', 'Culture Tips', 'Slang Dictionary'],
  Company: ['About', 'Careers', 'Contact', 'Press'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content slide up
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Link columns stagger
      const columns = contentRef.current?.querySelectorAll('.link-column');
      if (columns) {
        columns.forEach((column, colIndex) => {
          const items = column.querySelectorAll('.link-item');
          gsap.fromTo(
            items,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.2 + colIndex * 0.1,
            }
          );
        });
      }

      // Social icons pop
      const socials = contentRef.current?.querySelectorAll('.social-icon');
      if (socials) {
        gsap.fromTo(
          socials,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer ref={sectionRef} className="bg-[#070707] text-white pt-20 pb-8">
      <div ref={contentRef} className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Top Section - Newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 pb-16 border-b border-gray-800">
          <div>
            <h3 className="font-thunder text-4xl sm:text-5xl mb-4">
              STAY UPDATED
            </h3>
            <p className="text-gray-400 text-lg">
              Get Thai learning tips, new features, and exclusive offers
              delivered to your inbox.
            </p>
          </div>
          <div className="flex items-center">
            <form onSubmit={handleSubscribe} className="w-full flex gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ff3a1f] focus:ring-[#ff3a1f] h-14"
              />
              <Button
                type="submit"
                className="bg-[#ff3a1f] hover:bg-white hover:text-[#070707] text-white px-6 h-14 transition-all duration-300"
              >
                {subscribed ? 'Subscribed!' : <Send className="w-5 h-5" />}
              </Button>
            </form>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="link-column">
              <h4 className="font-semibold text-lg mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="link-item text-gray-400 hover:text-[#ff3a1f] hover:translate-x-1 transition-all duration-200 inline-block"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Coming soon!');
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Contact & Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-8 border-t border-gray-800">
          {/* Logo & Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#ff3a1f] rounded-full flex items-center justify-center">
                <span className="text-white font-thunder text-xl">R</span>
              </div>
              <span className="font-thunder text-2xl tracking-tight">
                RASSAME
              </span>
            </a>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Bangkok, Thailand
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@rassame.com
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="social-icon w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#ff3a1f] hover:text-white transition-all duration-300 hover:scale-110"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Coming soon!');
                  }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Rassame. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
