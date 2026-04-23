import { motion } from "framer-motion";
import { DollarSign, Calendar, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats, recentBookings, revenueByMonth } from "../mockData";

const iconMap = { 0: DollarSign, 1: Calendar, 2: Users, 3: TrendingUp };

export default function DashboardSection() {
  const maxRevenue = Math.max(...revenueByMonth.map((r) => r.revenue));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => {
          const Icon = iconMap[index as keyof typeof iconMap];
          return (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Revenue Overview</CardTitle>
          <CardDescription className="text-slate-400">Monthly revenue for the past 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-64">
            {revenueByMonth.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  AED {(m.revenue / 1000).toFixed(1)}k
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-md min-h-[4px] hover:from-blue-500 hover:to-purple-400 transition-colors"
                />
                <span className="text-xs text-slate-500">{m.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Bookings</CardTitle>
          <CardDescription className="text-slate-400">Latest service bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {booking.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{booking.customer}</p>
                    <p className="text-slate-400 text-sm">{booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium text-sm">AED {booking.amount}</p>
                  <p className="text-slate-400 text-xs">{booking.date} • {booking.time}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                    booking.status === "Completed" ? "bg-emerald-500/20 text-emerald-400" :
                    booking.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                    booking.status === "Cancelled" ? "bg-red-500/20 text-red-400" :
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
  );
}
