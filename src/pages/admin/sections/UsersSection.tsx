import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, MoreVertical, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { users } from "../mockData";

export default function UsersSection() {
  const [search, setSearch] = useState("");
  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length, color: "text-blue-400" },
          { label: "Active", value: users.filter((u) => u.status === "Active").length, color: "text-emerald-400" },
          { label: "VIP Members", value: users.filter((u) => u.role === "VIP").length, color: "text-purple-400" },
          { label: "Inactive", value: users.filter((u) => u.status === "Inactive").length, color: "text-red-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <p className="text-slate-400 text-sm">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-white">All Users</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-slate-700 border-slate-600 text-white w-64"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <UserPlus className="w-4 h-4 mr-2" /> Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-slate-400 text-sm font-medium py-3 px-2">User</th>
                  <th className="text-left text-slate-400 text-sm font-medium py-3 px-2">Contact</th>
                  <th className="text-left text-slate-400 text-sm font-medium py-3 px-2">Joined</th>
                  <th className="text-left text-slate-400 text-sm font-medium py-3 px-2">Bookings</th>
                  <th className="text-left text-slate-400 text-sm font-medium py-3 px-2">Role</th>
                  <th className="text-left text-slate-400 text-sm font-medium py-3 px-2">Status</th>
                  <th className="text-right text-slate-400 text-sm font-medium py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {u.name.charAt(0)}
                        </div>
                        <span className="text-white font-medium text-sm">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-slate-300 text-xs flex items-center gap-1"><Mail className="w-3 h-3" />{u.email}</div>
                      <div className="text-slate-400 text-xs flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" />{u.phone}</div>
                    </td>
                    <td className="py-3 px-2 text-slate-300 text-sm">{u.joined}</td>
                    <td className="py-3 px-2 text-slate-300 text-sm">{u.bookings}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${u.role === "VIP" ? "bg-purple-500/20 text-purple-400" : "bg-slate-600/40 text-slate-300"}`}>{u.role}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${u.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{u.status}</span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white"><MoreVertical className="w-4 h-4" /></Button>
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
