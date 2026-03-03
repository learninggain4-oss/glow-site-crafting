import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const services = [
  { name: "Auto Care", path: "/services/auto-care" },
  { name: "Accessories", path: "/services/accessories" },
  { name: "Leather", path: "/services/leather" },
  { name: "Electrical", path: "/services/electrical" },
  { name: "Painting", path: "/services/painting" },
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Services", path: "#", hasDropdown: true },
  { name: "Work Portfolio", path: "/portfolio" },
  { name: "Online Booking", path: "/booking" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-lg">FO</span>
          </div>
          <div>
            <span className="font-heading font-bold text-lg text-foreground leading-tight block">
              First Option
            </span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">UAE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {link.name}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-xl py-2 animate-fade-in-up">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-4 py-2.5 text-sm text-card-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-3">
          <a href="tel:+971505551234" className="hidden md:flex">
            <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.name}>
                      <p className="px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Services
                      </p>
                      {services.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
                          className="block px-6 py-2.5 text-foreground hover:text-primary transition-colors"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={cn(
                        "px-4 py-2.5 text-foreground hover:text-primary transition-colors",
                        location.pathname === link.path && "text-primary font-semibold"
                      )}
                    >
                      {link.name}
                    </Link>
                  )
                )}
                <div className="mt-4 px-4">
                  <a href="tel:+971505551234">
                    <Button className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
