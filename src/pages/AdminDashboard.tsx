import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  MessageSquare,
  FileText,
  Bell,
  TrendingUp,
  DollarSign,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Users", id: "users" },
  { icon: Calendar, label: "Bookings", id: "bookings" },
  { icon: Car, label: "Services", id: "services" },
  { icon: MessageSquare, label: "Messages", id: "messages" },
  { icon: FileText, label: "Reports", id: "reports" },
  { icon: Bell, label: "Notifications", id: "notifications" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const stats = [
  { title: "Total Revenue", value: "$12,450", change: "+12.5%", icon: DollarSign, color: "bg-green-500" },
  { title: "Total Bookings", value: "156", change: "+8.2%", icon: Calendar, color: "bg-blue-500" },
  { title: "Active Users", value: "89", change: "+5.1%", icon: Users, color: "bg-purple-500" },
  { title: "Services Done", value: "234", change: "+15.3%", icon: TrendingUp, color: "bg-orange-500" },
];

const recentBookings = [
  { id: 1, customer: "Ahmed Khan", service: "Full Detailing", date: "Apr 24, 2026", status: "Completed" },
  { id: 2, customer: "Sarah Johnson", service: "Ceramic Coating", date: "Apr 23, 2026", status: "Pending" },
  { id: 3, customer: "Mohammed Ali", service: "Paint Correction", date: "Apr 23, 2026", status: "In Progress" },
  { id: 4, customer: "Fatima Ahmed", service: "Interior Cleaning", date: "Apr 22, 2026", status: "Completed" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        className="bg-slate-800 border-r border-slate-700 flex flex-col"
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden"
              >
                <h1 className="text-white font-bold text-lg">GlowSite</h1>
                <p className="text-slate-400 text-xs">Admin Panel</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse & Logout */}
        <div className="p-3 border-t border-slate-700 space-y-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!collapsed && <span className="text-sm">Collapse</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white capitalize">{menuItems.find(i => i.id === activeTab)?.label}</h2>
            <p className="text-slate-400 text-sm">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Bell className="w-4 h-4 mr-2" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">{stat.title}</p>
                          <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                          <p className="text-green-400 text-xs mt-1">{stat.change} from last month</p>
                        </div>
                        <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Bookings */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Bookings</CardTitle>
                  <CardDescription className="text-slate-400">Latest service bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">
                            {booking.customer.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{booking.customer}</p>
                            <p className="text-slate-400 text-sm">{booking.service}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-sm">{booking.date}</p>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            booking.status === "Completed" ? "bg-green-500/20 text-green-400" :
                            booking.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-blue-500/20 text-blue-400"
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab !== "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    {menuItems.find(i => i.id === activeTab)?.icon && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        {(() => {
                          const Icon = menuItems.find(i => i.id === activeTab)?.icon;
                          return Icon ? <Icon className="w-5 h-5 text-white" /> : null;
                        })()}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 capitalize">{activeTab} Section</h3>
                  <p className="text-slate-400">This section is under development. Check back soon!</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}