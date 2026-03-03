import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Layout from "@/components/Layout";
import { z } from "zod";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  service: z.string().min(1, "Please select a service"),
  vehicleMake: z.string().trim().min(1, "Vehicle make is required").max(50),
  vehicleModel: z.string().trim().min(1, "Vehicle model is required").max(50),
  vehicleYear: z.string().trim().min(1, "Vehicle year is required").max(4),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().max(500).optional(),
});

const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
];

const Booking = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "",
    vehicleMake: "", vehicleModel: "", vehicleYear: "",
    time: "", notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse({ ...formData, date });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast({ title: "Booking Confirmed!", description: "We'll contact you shortly to confirm your appointment." });
  };

  if (submitted) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-8">Thank you for choosing First Option UAE. We'll contact you shortly to confirm your appointment details.</p>
            <Button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", service: "", vehicleMake: "", vehicleModel: "", vehicleYear: "", time: "", notes: "" }); setDate(undefined); }}>
              Book Another
            </Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Schedule</motion.p>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Online <span className="text-primary">Booking</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Book your appointment online and we'll take care of the rest.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact */}
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-secondary border-border" />
                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Input placeholder="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-secondary border-border" />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-secondary border-border" />
                        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Service Details</h3>
                    <div>
                      <Select value={formData.service} onValueChange={(v) => setFormData({ ...formData, service: v })}>
                        <SelectTrigger className="bg-secondary border-border">
                          <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Auto Care", "Accessories", "Leather", "Electrical", "Painting"].map((s) => (
                            <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && <p className="text-sm text-destructive mt-1">{errors.service}</p>}
                    </div>
                  </div>

                  {/* Vehicle */}
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Vehicle Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Input placeholder="Make (e.g. Toyota)" value={formData.vehicleMake} onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })} className="bg-secondary border-border" />
                        {errors.vehicleMake && <p className="text-sm text-destructive mt-1">{errors.vehicleMake}</p>}
                      </div>
                      <div>
                        <Input placeholder="Model (e.g. Camry)" value={formData.vehicleModel} onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })} className="bg-secondary border-border" />
                        {errors.vehicleModel && <p className="text-sm text-destructive mt-1">{errors.vehicleModel}</p>}
                      </div>
                      <div>
                        <Input placeholder="Year" value={formData.vehicleYear} onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })} className="bg-secondary border-border" />
                        {errors.vehicleYear && <p className="text-sm text-destructive mt-1">{errors.vehicleYear}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Preferred Date & Time</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-secondary border-border", !date && "text-muted-foreground")}>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                          </PopoverContent>
                        </Popover>
                        {errors.date && <p className="text-sm text-destructive mt-1">{errors.date}</p>}
                      </div>
                      <div>
                        <Select value={formData.time} onValueChange={(v) => setFormData({ ...formData, time: v })}>
                          <SelectTrigger className="bg-secondary border-border">
                            <SelectValue placeholder="Select Time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((t) => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.time && <p className="text-sm text-destructive mt-1">{errors.time}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <Textarea placeholder="Additional notes (optional)" rows={3} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="bg-secondary border-border" />
                  </div>

                  <Button type="submit" className="w-full" size="lg">Confirm Booking</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
