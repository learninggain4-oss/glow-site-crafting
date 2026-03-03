import { motion } from "framer-motion";
import { Award, Users, Target, Heart, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import aboutStory from "@/assets/about-story.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const values = [
  { title: "Quality First", description: "We never compromise on the quality of our work", icon: Award },
  { title: "Customer Focus", description: "Your satisfaction is our top priority", icon: Users },
  { title: "Innovation", description: "Using the latest technology and techniques", icon: Target },
  { title: "Passion", description: "We love what we do and it shows in our results", icon: Heart },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-4">About Us</motion.p>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Your Trusted <span className="text-primary">Auto Care</span> Partner
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              First Option UAE has been delivering premium auto care services, earning the trust of hundreds of satisfied customers across the UAE.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Our Story</p>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-6">A Legacy of <span className="text-primary">Excellence</span></h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Founded with a vision to redefine auto care standards in the UAE, First Option UAE has grown from a small workshop into one of the most trusted names in the industry.</p>
                <p>Our team of skilled professionals brings years of expertise and a genuine passion for automobiles. We treat every vehicle as if it were our own, ensuring meticulous attention to detail.</p>
                <p>From basic maintenance to complete vehicle transformation, we offer a comprehensive range of services designed to keep your car in pristine condition.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                <img src={aboutStory} alt="First Option UAE workshop" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeInUp}>
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Our Mission</p>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Driven by <span className="text-primary">Passion</span></h2>
              <p className="text-lg text-muted-foreground mb-12">
                To provide world-class auto care services that exceed expectations, combining cutting-edge technology with skilled craftsmanship to deliver outstanding results every time.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v) => (
                <Card key={v.title} className="bg-card border-border text-left">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <v.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">{v.title}</h3>
                      <p className="text-sm text-muted-foreground">{v.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Why First Option</p>
              <h2 className="font-heading text-4xl font-bold text-foreground">The <span className="text-primary">Difference</span></h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-4">
              {[
                "Certified and experienced technicians",
                "State-of-the-art equipment and facilities",
                "Genuine parts and premium materials",
                "Transparent pricing with no hidden costs",
                "Customer satisfaction guarantee",
                "Convenient location in Al Quoz, Dubai",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
