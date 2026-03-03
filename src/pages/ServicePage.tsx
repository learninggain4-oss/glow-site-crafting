import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench, Sofa, Zap, Palette, CheckCircle, ChevronRight } from "lucide-react";
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

const serviceData: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  icon: typeof Car;
  features: string[];
}> = {
  "auto-care": {
    title: "Auto Care",
    description: "Complete vehicle maintenance and detailing",
    longDescription: "Our comprehensive auto care services cover everything from routine maintenance to full vehicle detailing. We use premium products and state-of-the-art equipment to ensure your vehicle receives the best treatment possible.",
    icon: Car,
    features: [
      "Full interior & exterior detailing",
      "Paint correction & ceramic coating",
      "Engine bay cleaning",
      "Upholstery deep cleaning",
      "Headlight restoration",
      "Scratch & dent removal",
    ],
  },
  accessories: {
    title: "Accessories",
    description: "Premium vehicle accessories and upgrades",
    longDescription: "Transform your vehicle with our wide range of premium accessories. From aesthetic enhancements to functional upgrades, we source and install only the highest quality accessories.",
    icon: Wrench,
    features: [
      "Alloy wheel upgrades",
      "Body kits & spoilers",
      "Window tinting",
      "Interior trim upgrades",
      "Audio system installation",
      "LED lighting upgrades",
    ],
  },
  leather: {
    title: "Leather",
    description: "Expert leather restoration and customization",
    longDescription: "Our leather specialists bring worn interiors back to life. Whether it's restoration, repair, or complete re-upholstery, we deliver craftsmanship of the highest standard.",
    icon: Sofa,
    features: [
      "Leather seat restoration",
      "Custom leather upholstery",
      "Leather cleaning & conditioning",
      "Color matching & dyeing",
      "Steering wheel re-wrap",
      "Dashboard leather covering",
    ],
  },
  electrical: {
    title: "Electrical",
    description: "Advanced electrical diagnostics and repair",
    longDescription: "Our certified electrical technicians handle everything from basic wiring to complex electronic system diagnostics. We use advanced tools to pinpoint and fix electrical issues efficiently.",
    icon: Zap,
    features: [
      "Full electrical diagnostics",
      "ECU programming & coding",
      "Wiring harness repair",
      "Battery testing & replacement",
      "Sensor calibration",
      "Multimedia system setup",
    ],
  },
  painting: {
    title: "Painting",
    description: "Professional auto painting and refinishing",
    longDescription: "Our painting experts deliver flawless finishes with precision color matching. From minor touch-ups to complete resprays, we use premium paints and coatings.",
    icon: Palette,
    features: [
      "Full body respray",
      "Custom color matching",
      "Touch-up painting",
      "Clear coat application",
      "Matte & gloss finishes",
      "Protective film application",
    ],
  },
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Link to="/"><Button>Go Home</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  const Icon = service.icon;

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Icon className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
              {service.title}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">{service.description}</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeInUp}>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">About This <span className="text-primary">Service</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{service.longDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <Button size="lg" className="gap-2">
                    Book This Service <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Get Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-6">What's Included</h3>
                  <div className="space-y-4">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience the First Option difference.
            </p>
            <Link to="/booking">
              <Button size="lg" className="text-base px-8 py-6">Book Now</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicePage;
