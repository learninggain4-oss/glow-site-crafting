import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Reply, Trash2, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { messages } from "../mockData";

export default function MessagesSection() {
  const [selected, setSelected] = useState(messages[0]);
  const [search, setSearch] = useState("");
  const filtered = messages.filter((m) => m.subject.toLowerCase().includes(search.toLowerCase()) || m.from.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
      {/* Message List */}
      <Card className="bg-slate-800 border-slate-700 lg:col-span-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-base">Inbox ({messages.filter((m) => m.unread).length} unread)</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-slate-700 border-slate-600 text-white" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          {filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m)}
              className={`w-full text-left p-4 border-b border-slate-700 hover:bg-slate-700/30 transition-colors ${selected.id === m.id ? "bg-slate-700/50 border-l-4 border-l-blue-500" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {m.from.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm truncate ${m.unread ? "text-white font-semibold" : "text-slate-300"}`}>{m.from}</p>
                    <p className="text-xs text-slate-500">{m.time}</p>
                  </div>
                </div>
                {m.unread && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />}
              </div>
              <p className={`text-sm mt-2 truncate ${m.unread ? "text-white font-medium" : "text-slate-400"}`}>{m.subject}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{m.preview}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Message Detail */}
      <Card className="bg-slate-800 border-slate-700 lg:col-span-2 flex flex-col">
        <CardHeader className="border-b border-slate-700">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <CardTitle className="text-white">{selected.subject}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {selected.from.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm">{selected.from}</p>
                  <p className="text-slate-400 text-xs">{selected.email} • {selected.time}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-yellow-400"><Star className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto py-6">
          <p className="text-slate-300 leading-relaxed">{selected.preview}</p>
          <p className="text-slate-300 leading-relaxed mt-4">
            Looking forward to hearing from you soon. Please let me know if you need any additional information.
          </p>
          <p className="text-slate-300 mt-4">Best regards,<br />{selected.from}</p>
        </CardContent>
        <div className="border-t border-slate-700 p-4 space-y-3">
          <Textarea placeholder="Type your reply..." className="bg-slate-700 border-slate-600 text-white min-h-[80px]" />
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Reply className="w-4 h-4 mr-2" /> Send Reply
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
