import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Bell, Palette, Globe, Building2, Save, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language", icon: Globe },
  { id: "business", label: "Business", icon: Building2 },
];

export default function SettingsSection() {
  const { user } = useAuth();
  const [active, setActive] = useState("profile");

  // Profile
  const [name, setName] = useState(user?.name || "Admin User");
  const [email, setEmail] = useState(user?.email || "admin@firstoptionuae.com");
  const [phone, setPhone] = useState("+971 50 123 4567");
  const [bio, setBio] = useState("Administrator at First Option UAE Auto Care");

  // Security
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [bookingNotif, setBookingNotif] = useState(true);
  const [paymentNotif, setPaymentNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);

  // Appearance
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("blue");
  const [density, setDensity] = useState("comfortable");

  // Language
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Dubai");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [currency, setCurrency] = useState("AED");

  // Business
  const [bizName, setBizName] = useState("First Option UAE");
  const [bizEmail, setBizEmail] = useState("contact@firstoptionuae.com");
  const [bizPhone, setBizPhone] = useState("+971 4 123 4567");
  const [bizAddress, setBizAddress] = useState("Sheikh Zayed Road, Dubai, UAE");
  const [bizHours, setBizHours] = useState("Mon-Sat: 8:00 AM - 8:00 PM");
  const [bizTax, setBizTax] = useState("100123456700003");

  const save = (label: string) => toast.success(`${label} saved successfully`);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Tabs */}
      <Card className="bg-slate-800 border-slate-700 lg:col-span-1 h-fit">
        <CardContent className="p-3 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                active === t.id ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <t.icon className="w-4 h-4" />
              <span className="font-medium">{t.label}</span>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="lg:col-span-3 space-y-4">
        {active === "profile" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Profile Settings</CardTitle>
              <CardDescription className="text-slate-400">Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {name.charAt(0)}
                </div>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Upload className="w-4 h-4 mr-2" /> Change Avatar
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Full Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
                <div>
                  <Label className="text-slate-300">Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
                <div>
                  <Label className="text-slate-300">Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
                <div>
                  <Label className="text-slate-300">Role</Label>
                  <Input value="Administrator" disabled className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
              </div>
              <div>
                <Label className="text-slate-300">Bio</Label>
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
              </div>
              <Button onClick={() => save("Profile")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {active === "security" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription className="text-slate-400">Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300">Current Password</Label>
                <Input type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">New Password</Label>
                  <Input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
                <div>
                  <Label className="text-slate-300">Confirm New Password</Label>
                  <Input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-700/40 rounded-lg">
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
              <div className="p-4 bg-slate-700/40 rounded-lg">
                <p className="text-white font-medium mb-3">Active Sessions</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-slate-300">Chrome on macOS</p>
                      <p className="text-slate-500 text-xs">Dubai, UAE • Current session</p>
                    </div>
                    <span className="text-emerald-400 text-xs">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-slate-300">Safari on iPhone</p>
                      <p className="text-slate-500 text-xs">Dubai, UAE • 2 hours ago</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 h-auto py-1">Revoke</Button>
                  </div>
                </div>
              </div>
              <Button onClick={() => save("Security settings")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Save className="w-4 h-4 mr-2" /> Update Password
              </Button>
            </CardContent>
          </Card>
        )}

        {active === "notifications" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-slate-400">Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Email Notifications", desc: "Receive notifications via email", value: emailNotif, set: setEmailNotif },
                { label: "Push Notifications", desc: "Browser push notifications", value: pushNotif, set: setPushNotif },
                { label: "SMS Notifications", desc: "Text message notifications", value: smsNotif, set: setSmsNotif },
                { label: "New Bookings", desc: "Get notified when a new booking is made", value: bookingNotif, set: setBookingNotif },
                { label: "Payments", desc: "Payment received and refund alerts", value: paymentNotif, set: setPaymentNotif },
                { label: "Marketing Updates", desc: "Product updates and promotions", value: marketingNotif, set: setMarketingNotif },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between p-4 bg-slate-700/40 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{n.label}</p>
                    <p className="text-slate-400 text-sm">{n.desc}</p>
                  </div>
                  <Switch checked={n.value} onCheckedChange={n.set} />
                </div>
              ))}
              <Button onClick={() => save("Notification preferences")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Save className="w-4 h-4 mr-2" /> Save Preferences
              </Button>
            </CardContent>
          </Card>
        )}

        {active === "appearance" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Appearance</CardTitle>
              <CardDescription className="text-slate-400">Customize how the admin panel looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label className="text-slate-300">Theme</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {["light", "dark", "system"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`p-4 rounded-lg border-2 transition-all capitalize ${theme === t ? "border-blue-500 bg-blue-500/10 text-white" : "border-slate-600 text-slate-300 hover:border-slate-500"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-slate-300">Accent Color</Label>
                <div className="flex gap-3 mt-2">
                  {[
                    { id: "blue", color: "bg-blue-500" },
                    { id: "purple", color: "bg-purple-500" },
                    { id: "emerald", color: "bg-emerald-500" },
                    { id: "orange", color: "bg-orange-500" },
                    { id: "pink", color: "bg-pink-500" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setAccent(c.id)}
                      className={`w-10 h-10 rounded-full ${c.color} ${accent === c.id ? "ring-2 ring-offset-2 ring-offset-slate-800 ring-white" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-slate-300">Density</Label>
                <Select value={density} onValueChange={setDensity}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => save("Appearance settings")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Save className="w-4 h-4 mr-2" /> Apply Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {active === "language" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Language & Region</CardTitle>
              <CardDescription className="text-slate-400">Set your language and regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية (Arabic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                      <SelectItem value="Asia/Riyadh">Asia/Riyadh (AST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Date Format</Label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => save("Language settings")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Save className="w-4 h-4 mr-2" /> Save Settings
              </Button>
            </CardContent>
          </Card>
        )}

        {active === "business" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Business Information</CardTitle>
              <CardDescription className="text-slate-400">Manage your business details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Business Name</Label>
                  <Input value={bizName} onChange={(e) => setBizName(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
                <div>
                  <Label className="text-slate-300">Business Email</Label>
                  <Input value={bizEmail} onChange={(e) => setBizEmail(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
                <div>
                  <Label className="text-slate-300">Business Phone</Label>
                  <Input value={bizPhone} onChange={(e) => setBizPhone(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
                <div>
                  <Label className="text-slate-300">Tax / TRN Number</Label>
                  <Input value={bizTax} onChange={(e) => setBizTax(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
                </div>
              </div>
              <div>
                <Label className="text-slate-300">Address</Label>
                <Textarea value={bizAddress} onChange={(e) => setBizAddress(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
              </div>
              <div>
                <Label className="text-slate-300">Business Hours</Label>
                <Input value={bizHours} onChange={(e) => setBizHours(e.target.value)} className="bg-slate-700 border-slate-600 text-white mt-1.5" />
              </div>
              <Button onClick={() => save("Business information")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Save className="w-4 h-4 mr-2" /> Save Business Info
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
}
