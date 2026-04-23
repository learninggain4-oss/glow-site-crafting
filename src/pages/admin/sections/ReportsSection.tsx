import { motion } from "framer-motion";
import { FileText, Download, Plus, FileSpreadsheet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { reports } from "../mockData";

export default function ReportsSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: reports.length, color: "text-blue-400" },
          { label: "PDF Reports", value: reports.filter((r) => r.format === "PDF").length, color: "text-red-400" },
          { label: "Excel Reports", value: reports.filter((r) => r.format === "Excel").length, color: "text-emerald-400" },
          { label: "This Month", value: reports.filter((r) => r.generated.includes("Apr")).length, color: "text-purple-400" },
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Generated Reports</CardTitle>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Generate Report
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${r.format === "PDF" ? "bg-red-500/20" : "bg-emerald-500/20"}`}>
                  {r.format === "PDF" ? <FileText className="w-6 h-6 text-red-400" /> : <FileSpreadsheet className="w-6 h-6 text-emerald-400" />}
                </div>
                <div>
                  <p className="text-white font-medium">{r.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-slate-400 text-xs">{r.type}</span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-slate-400 text-xs">{r.period}</span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-slate-400 text-xs">{r.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-xs hidden md:block">{r.generated}</span>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Download className="w-4 h-4 mr-1" /> Download
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
