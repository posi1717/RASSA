import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-10 h-10 bg-[#ff3a1f] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-thunder text-xl">R</span>
              </div>
              <span className="font-thunder text-2xl text-[#070707] tracking-tight">
                RASSAME
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-[#5e5e5e] hover:text-[#ff3a1f] transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff3a1f] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-[#070707] hover:text-[#ff3a1f] hover:bg-transparent"
                onClick={() => scrollToSection('#pricing')}
              >
                Sign In
              </Button>
              <Button
                className="bg-[#ff3a1f] hover:bg-[#070707] text-white px-6 transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection('#pricing')}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#070707]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="font-thunder text-3xl text-[#070707] hover:text-[#ff3a1f] transition-colors duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <Button
            className="mt-8 bg-[#ff3a1f] hover:bg-[#070707] text-white px-8 py-6 text-lg"
            onClick={() => scrollToSection('#pricing')}
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
