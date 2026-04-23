import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Clock, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "../mockData";

export default function ServicesSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white text-lg font-bold">Manage Services</h3>
          <p className="text-slate-400 text-sm">{services.length} services available</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-base">{s.name}</CardTitle>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300">
                      <Tag className="w-3 h-3" />{s.category}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${s.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {s.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs">Price</p>
                    <p className="text-white text-2xl font-bold">AED {s.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">Total Bookings</p>
                    <p className="text-blue-400 text-xl font-bold">{s.bookings}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{s.duration}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Edit className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
