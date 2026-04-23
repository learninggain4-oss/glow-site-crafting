import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { allBookings } from "../mockData";

const statuses = ["All", "Pending", "In Progress", "Completed", "Cancelled"];

export default function BookingsSection() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = allBookings.filter((b) => {
    const matchSearch = b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || b.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statuses.slice(1).map((s) => {
          const count = allBookings.filter((b) => b.status === s).length;
          const colors: Record<string, string> = {
            Pending: "text-yellow-400",
            "In Progress": "text-blue-400",
            Completed: "text-emerald-400",
            Cancelled: "text-red-400",
          };
          return (
            <Card key={s} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <p className="text-slate-400 text-sm">{s}</p>
                <p className={`text-2xl font-bold mt-1 ${colors[s]}`}>{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-white">All Bookings</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-slate-700 border-slate-600 text-white w-64" />
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Plus className="w-4 h-4 mr-2" /> New Booking
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400" />
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  status === s ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  {["Booking ID", "Customer", "Service", "Vehicle", "Date & Time", "Amount", "Payment", "Status"].map((h) => (
                    <th key={h} className="text-left text-slate-400 text-sm font-medium py-3 px-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3 px-2 text-blue-400 text-sm font-mono">{b.id}</td>
                    <td className="py-3 px-2 text-white text-sm">{b.customer}</td>
                    <td className="py-3 px-2 text-slate-300 text-sm">{b.service}</td>
                    <td className="py-3 px-2 text-slate-300 text-sm">{b.vehicle}</td>
                    <td className="py-3 px-2 text-slate-300 text-sm">{b.date} • {b.time}</td>
                    <td className="py-3 px-2 text-white text-sm font-medium">AED {b.amount}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        b.payment === "Paid" ? "bg-emerald-500/20 text-emerald-400" :
                        b.payment === "Pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"
                      }`}>{b.payment}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        b.status === "Completed" ? "bg-emerald-500/20 text-emerald-400" :
                        b.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                        b.status === "Cancelled" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                      }`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
