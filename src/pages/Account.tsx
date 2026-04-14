import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarDays, CheckCircle, CreditCard, Shield, Star, RefreshCw, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ParticleField from "@/components/ParticleField";
import { useLanguage } from "@/i18n/LanguageContext";

interface AccountProfile {
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
}

type BookingStatus = "Confirmed" | "Cancelled" | "Rescheduled";

interface BookingEntry {
  id: string;
  invoiceNumber: string;
  createdAt: number;
  service: string;
  date: string;
  time: string;
  paymentMethod: string;
  pickupService: string;
  status: BookingStatus;
  total: number;
  couponCode?: string;
  addOns: string[];
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  notes: string;
}

const timeSlots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"];

const getTier = (points: number) => {
  if (points >= 500) return "Platinum";
  if (points >= 250) return "Gold";
  return "Bronze";
};

const loadAccount = () => {
  const raw = localStorage.getItem("firstOptionAccount");
  return raw ? JSON.parse(raw) as { profile: AccountProfile; bookings: BookingEntry[] } : null;
};

const saveAccount = (account: { profile: AccountProfile; bookings: BookingEntry[] }) => {
  localStorage.setItem("firstOptionAccount", JSON.stringify(account));
};

const Account = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [bookings, setBookings] = useState<BookingEntry[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  useEffect(() => {
    const account = loadAccount();
    if (account) {
      setProfile(account.profile);
      setBookings(account.bookings);
    }
  }, []);

  const bookingCounts = useMemo(
    () => ({
      confirmed: bookings.filter((item) => item.status === "Confirmed").length,
      cancelled: bookings.filter((item) => item.status === "Cancelled").length,
      rescheduled: bookings.filter((item) => item.status === "Rescheduled").length,
    }),
    [bookings],
  );

  const availableSlots = useMemo(() => {
    const today = new Date();
    return timeSlots.map((slot, index) => ({
      slot,
      day: format(new Date(today.getFullYear(), today.getMonth(), today.getDate() + index), "EEE, MMM d"),
    }));
  }, []);

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors: Record<string, string> = {};
    if (!formData.name.trim()) fieldErrors.name = t("booking.fullName");
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) fieldErrors.email = t("contact.email");
    if (!formData.phone.trim()) fieldErrors.phone = t("contact.phone");
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    const newProfile: AccountProfile = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      loyaltyPoints: 20,
    };

    const account = loadAccount();
    const bookingsFromStore = account?.bookings ?? [];
    const updatedAccount = { profile: newProfile, bookings: bookingsFromStore };
    saveAccount(updatedAccount);
    setProfile(newProfile);
    setBookings(bookingsFromStore);
    setErrors({});
    setFormData({ name: "", email: "", phone: "" });
  };

  const updateBooking = (id: string, changes: Partial<BookingEntry>) => {
    const updated = bookings.map((booking) => (booking.id === id ? { ...booking, ...changes } : booking));
    setBookings(updated);
    if (profile) {
      saveAccount({ profile, bookings: updated });
    }
  };

  const handleCancel = (id: string) => {
    updateBooking(id, { status: "Cancelled" });
  };

  const handleReschedule = (booking: BookingEntry) => {
    if (!rescheduleDate || !rescheduleTime) return;
    updateBooking(booking.id, {
      date: rescheduleDate,
      time: rescheduleTime,
      status: "Rescheduled",
    });
    setRescheduleId(null);
    setRescheduleDate("");
    setRescheduleTime("");
  };

  const handleDownloadInvoice = (entry: BookingEntry) => {
    const invoiceText = `Invoice #${entry.invoiceNumber}\nCustomer: ${profile?.name || "Guest"}\nEmail: ${profile?.email || "-"}\nPhone: ${profile?.phone || "-"}\nService: ${entry.service}\nDate: ${entry.date} ${entry.time}\nPickup: ${entry.pickupService}\nPayment: ${entry.paymentMethod}\nTotal: AED ${entry.total}\nStatus: ${entry.status}\n\nThank you for choosing First Option UAE.`;
    const blob = new Blob([invoiceText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `Invoice-${entry.invoiceNumber}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <ParticleField count={10} className="opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal variant="fadeUp">
            <div className="max-w-3xl mx-auto">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("account.subtitle")}</p>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
                <TextReveal text={t("account.title1")} /> <span className="text-primary">{t("account.title2")}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("account.loginHint")}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {!profile ? (
            <ScrollReveal variant="fadeUp">
              <Card className="bg-card border-border card-hover-glow max-w-3xl mx-auto">
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">{t("account.createProfile")}</h2>
                  <form onSubmit={handleCreateAccount} className="grid gap-4">
                    <div>
                      <Input placeholder={t("account.profileName")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-secondary border-border" />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Input placeholder={t("account.profileEmail")} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-secondary border-border" />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Input placeholder={t("account.profilePhone")} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-secondary border-border" />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <Button type="submit" className="w-full shine-effect">{t("account.createProfile")}</Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          ) : (
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
              <div className="space-y-6">
                <ScrollReveal variant="fadeUp">
                  <Card className="bg-card border-border card-hover-glow">
                    <CardContent className="p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-2">{t("account.manageBookings")}</p>
                          <h2 className="font-heading text-3xl font-bold text-foreground">{profile.name}</h2>
                          <p className="text-muted-foreground mt-2">{profile.email} · {profile.phone}</p>
                        </div>
                        <div className="rounded-3xl bg-primary/10 p-4 text-center">
                          <p className="text-sm text-muted-foreground">{t("account.loyaltyPoints")}</p>
                          <p className="text-3xl font-bold text-foreground">{profile.loyaltyPoints}</p>
                          <p className="text-xs text-muted-foreground mt-1">{t("account.rewardTier")} {getTier(profile.loyaltyPoints)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                <ScrollReveal variant="fadeUp" delay={0.15}>
                  <Card className="bg-card border-border card-hover-glow">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Shield className="h-5 w-5 text-primary" />
                        <h3 className="font-heading text-xl font-semibold text-foreground">{t("account.availableSlots")}</h3>
                      </div>
                      <div className="grid gap-3">
                        {availableSlots.map((slot) => (
                          <div key={slot.slot} className="rounded-3xl border border-border bg-background/80 p-4 flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">{slot.day}</p>
                              <p className="font-medium text-foreground">{slot.slot}</p>
                            </div>
                            <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">{t("hero.bookNow")}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>

              <div className="space-y-6">
                <ScrollReveal variant="fadeUp" delay={0.2}>
                  <Card className="bg-card border-border card-hover-glow">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Star className="h-5 w-5 text-primary" />
                        <h3 className="font-heading text-xl font-semibold text-foreground">{t("account.accountSummary")}</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-3xl bg-background/80 p-4 text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-2">{t("account.confirmed")}</p>
                          <p className="text-2xl font-bold text-foreground">{bookingCounts.confirmed}</p>
                        </div>
                        <div className="rounded-3xl bg-background/80 p-4 text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-2">{t("account.rescheduled")}</p>
                          <p className="text-2xl font-bold text-foreground">{bookingCounts.rescheduled}</p>
                        </div>
                        <div className="rounded-3xl bg-background/80 p-4 text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-2">{t("account.cancelled")}</p>
                          <p className="text-2xl font-bold text-foreground">{bookingCounts.cancelled}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          )}
        </div>
      </section>

      {profile && (
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="fadeUp">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">{t("account.bookingHistory")}</h2>
            </ScrollReveal>

            <div className="grid gap-6">
              {bookings.length ? (
                bookings.map((booking) => (
                  <ScrollReveal key={booking.id} variant="fadeUp" delay={0.05}>
                    <Card className="bg-card border-border card-hover-glow">
                      <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">{format(new Date(booking.createdAt), "PPP")}</p>
                            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">{booking.service}</h3>
                            <p className="text-sm text-muted-foreground">{booking.vehicleMake} {booking.vehicleModel} · {booking.vehicleYear}</p>
                          </div>
                          <div className="flex flex-col gap-2 text-right">
                            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("account.status")}</span>
                            <span className={booking.status === "Cancelled" ? "text-destructive font-semibold" : "text-primary font-semibold"}>
                              {booking.status === "Confirmed" ? t("account.confirmed") : booking.status === "Cancelled" ? t("account.cancelled") : t("account.rescheduled")}
                            </span>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm text-muted-foreground">
                          <div className="rounded-3xl bg-background/80 p-4">
                            <p className="font-semibold text-foreground mb-1">{t("booking.summaryDate")}</p>
                            <p>{booking.date} · {booking.time}</p>
                          </div>
                          <div className="rounded-3xl bg-background/80 p-4">
                            <p className="font-semibold text-foreground mb-1">{t("booking.summaryPayment")}</p>
                            <p>{booking.paymentMethod}</p>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-4 mt-6 text-sm">
                          <div className="rounded-3xl bg-secondary/10 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{t("account.invoice")}</p>
                            <p className="font-semibold text-foreground">{booking.invoiceNumber}</p>
                          </div>
                          <div className="rounded-3xl bg-secondary/10 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{t("booking.summaryPickup")}</p>
                            <p>{booking.pickupService}</p>
                          </div>
                          <div className="rounded-3xl bg-secondary/10 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{t("booking.totalEstimate")}</p>
                            <p className="font-semibold text-foreground">AED {booking.total}</p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                          <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(booking)} className="gap-2">
                            <Download className="h-4 w-4" />
                            {t("account.invoice")}
                          </Button>
                          <Button variant="secondary" size="sm" onClick={() => handleCancel(booking.id)} className="gap-2">
                            <X className="h-4 w-4" />
                            {t("account.cancel")}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => {
                            setRescheduleId(booking.id);
                            setRescheduleDate(booking.date);
                            setRescheduleTime(booking.time);
                          }} className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            {t("account.reschedule")}
                          </Button>
                        </div>

                        {rescheduleId === booking.id && (
                          <div className="mt-6 rounded-3xl border border-primary/20 bg-background/80 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <CalendarDays className="h-5 w-5 text-primary" />
                              <h4 className="font-semibold text-lg text-foreground">{t("account.rescheduleTitle")}</h4>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <Input type="date" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} className="bg-secondary border-border" />
                              <Select value={rescheduleTime} onValueChange={(value) => setRescheduleTime(value)}>
                                <SelectTrigger className="bg-secondary border-border">
                                  <SelectValue placeholder={t("booking.selectTime")} />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3">
                              <Button size="sm" onClick={() => handleReschedule(booking)} className="gap-2">
                                <CheckCircle className="h-4 w-4" />
                                {t("account.saveChanges")}
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => setRescheduleId(null)}>{t("account.cancel")}</Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))
              ) : (
                <ScrollReveal variant="fadeUp">
                  <Card className="bg-card border-border card-hover-glow">
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">{t("account.noBookings")}</p>
                      <Link to="/booking">
                        <Button className="mt-6 shine-effect">{t("hero.bookNow")}</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Account;
