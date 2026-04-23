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
  MessageSquare,
  FileText,
  Bell,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import DashboardSection from "./admin/sections/DashboardSection";
import UsersSection from "./admin/sections/UsersSection";
import BookingsSection from "./admin/sections/BookingsSection";
import ServicesSection from "./admin/sections/ServicesSection";
import MessagesSection from "./admin/sections/MessagesSection";
import ReportsSection from "./admin/sections/ReportsSection";
import NotificationsSection from "./admin/sections/NotificationsSection";
import SettingsSection from "./admin/sections/SettingsSection";
import { notifications as notifData } from "./admin/mockData";

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const unreadNotifs = notifData.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const renderSection = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardSection />;
      case "users": return <UsersSection />;
      case "bookings": return <BookingsSection />;
      case "services": return <ServicesSection />;
      case "messages": return <MessagesSection />;
      case "reports": return <ReportsSection />;
      case "notifications": return <NotificationsSection />;
      case "settings": return <SettingsSection />;
      default: return <DashboardSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        className="bg-slate-800 border-r border-slate-700 flex flex-col"
      >
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
                <h1 className="text-white font-bold text-lg">First Option</h1>
                <p className="text-slate-400 text-xs">Admin Panel</p>
              </motion.div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium flex-1 text-left">
                  {item.label}
                </motion.span>
              )}
              {item.id === "notifications" && unreadNotifs > 0 && !collapsed && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadNotifs}</span>
              )}
              {item.id === "notifications" && unreadNotifs > 0 && collapsed && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

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
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-white capitalize">{menuItems.find((i) => i.id === activeTab)?.label}</h2>
            <p className="text-slate-400 text-sm">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("notifications")}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 relative"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        <div className="p-6">{renderSection()}</div>
      </main>
    </div>
  );
}
