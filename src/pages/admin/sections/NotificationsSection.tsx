import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign, User, CheckCircle, AlertCircle, Star, X, Settings as SettingsIcon, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notifications as initial } from "../mockData";

const typeConfig: Record<string, { icon: any; color: string; bg: string }> = {
  booking: { icon: Calendar, color: "text-blue-400", bg: "bg-blue-500/20" },
  payment: { icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  user: { icon: User, color: "text-purple-400", bg: "bg-purple-500/20" },
  service: { icon: CheckCircle, color: "text-cyan-400", bg: "bg-cyan-500/20" },
  alert: { icon: AlertCircle, color: "text-yellow-400", bg: "bg-yellow-500/20" },
  review: { icon: Star, color: "text-orange-400", bg: "bg-orange-500/20" },
  system: { icon: SettingsIcon, color: "text-slate-400", bg: "bg-slate-500/20" },
};

export default function NotificationsSection() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = filter === "unread" ? items.filter((n) => !n.read) : items;
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const dismiss = (id: number) => setItems(items.filter((n) => n.id !== id));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-white">
              Notifications {unreadCount > 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs">{unreadCount} new</span>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-full text-xs font-medium ${filter === "all" ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300"}`}>All</button>
              <button onClick={() => setFilter("unread")} className={`px-3 py-1 rounded-full text-xs font-medium ${filter === "unread" ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300"}`}>Unread</button>
              <Button variant="outline" size="sm" onClick={markAllRead} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Check className="w-3 h-3 mr-1" /> Mark all read
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {filtered.length === 0 && (
            <p className="text-slate-400 text-center py-8">No notifications</p>
          )}
          {filtered.map((n, i) => {
            const cfg = typeConfig[n.type] || typeConfig.system;
            const Icon = cfg.icon;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-start gap-3 p-4 rounded-lg transition-colors ${n.read ? "bg-slate-700/30" : "bg-slate-700/60 border-l-4 border-l-blue-500"}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                  <Icon className={`w-5 h-5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${n.read ? "text-slate-300" : "text-white font-semibold"}`}>{n.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{n.message}</p>
                  <p className="text-slate-500 text-xs mt-1">{n.time}</p>
                </div>
                <div className="flex gap-1">
                  {!n.read && (
                    <Button variant="ghost" size="icon" onClick={() => markRead(n.id)} className="h-7 w-7 text-slate-400 hover:text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => dismiss(n.id)} className="h-7 w-7 text-slate-400 hover:text-red-400">
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
