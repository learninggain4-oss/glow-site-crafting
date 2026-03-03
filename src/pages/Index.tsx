import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Shield, Award, Car, Wrench, Palette, Zap, Sofa, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stats = [
  { label: "Google Rating", value: "4.9+", icon: Star },
  { label: "Years Experience", value: "4+", icon: Award },
  { label: "Happy Customers", value: "100%", icon: Shield },
];

const features = [
  { title: "Best in UAE", description: "Top-rated auto care service center", icon: Award },
  { title: "24-Hour Service", description: "Round the clock availability", icon: Clock },
  { title: "Free Assessment", description: "Complimentary vehicle inspection", icon: Shield },
  { title: "Precision Care", description: "Attention to every detail", icon: Wrench },
];

const services = [
  { title: "Auto Care", description: "Complete vehicle maintenance and detailing services", icon: Car, path: "/services/auto-care" },
  { title: "Accessories", description: "Premium vehicle accessories and upgrades", icon: Wrench, path: "/services/accessories" },
  { title: "Leather", description: "Expert leather restoration and customization", icon: Sofa, path: "/services/leather" },
  { title: "Electrical", description: "Advanced electrical system diagnostics and repair", icon: Zap, path: "/services/electrical" },
  { title: "Painting", description: "Professional auto painting and refinishing", icon: Palette, path: "/services/painting" },
];

const testimonials = [
  { name: "Ahmed K.", text: "Outstanding service! My car looks brand new after their detailing work. Highly recommended!", rating: 5 },
  { name: "Sarah M.", text: "Best auto care center in Dubai. Professional team and excellent results every time.", rating: 5 },
  { name: "Mohammed R.", text: "The leather restoration work was incredible. They truly care about quality.", rating: 5 },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Welcome to First Option UAE
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              Best Auto Care{" "}
              <span className="text-primary">Service Centre</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Experience premium auto care services with cutting-edge technology and a passionate team dedicated to perfection.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" className="text-base px-8 py-6 font-semibold">
                  Book Now
                </Button>
              </Link>
              <Link to="/services/auto-care">
                <Button variant="outline" size="lg" className="text-base px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp}>
                <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Why Choose Us</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                What Makes Us <span className="text-primary">Different</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <motion.div key={feature.title} variants={fadeInUp}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">What We Offer</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                Our <span className="text-primary">Services</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <motion.div key={service.title} variants={fadeInUp}>
                  <Link to={service.path}>
                    <Card className="bg-card border-border hover:border-primary transition-all hover:-translate-y-2 group h-full cursor-pointer">
                      <CardContent className="p-8">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-5 transition-colors">
                          <service.icon className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          Learn More <ChevronRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flawless Finish / Trust Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Excellence</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Flawless <span className="text-primary">Finish</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                We take pride in delivering impeccable results that exceed expectations. Every vehicle receives our signature touch of excellence.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {["Trusted Auto Care", "Top Car Service", "Expert Vehicle Care"].map((trust) => (
                <div key={trust} className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-heading font-semibold text-foreground">{trust}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Our Work</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                Work <span className="text-primary">Portfolio</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer relative"
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                    <Car className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground font-heading font-semibold">
                      View Project
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center mt-10">
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Explore More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Testimonials</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                What Our Clients <span className="text-primary">Say</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="bg-card border-border h-full">
                    <CardContent className="p-8">
                      <Quote className="h-8 w-8 text-primary/30 mb-4" />
                      <p className="text-muted-foreground mb-6 leading-relaxed">{t.text}</p>
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(t.rating)].map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="font-heading font-semibold text-foreground">{t.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your <span className="text-primary">Vehicle</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Book a free consultation today and let our experts take care of your car.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" className="text-base px-8 py-6">Book Free Consultation</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="text-base px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
