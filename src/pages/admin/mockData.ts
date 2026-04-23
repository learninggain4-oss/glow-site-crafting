// Mock data for the admin panel sections

export const dashboardStats = [
  { title: "Total Revenue", value: "AED 48,250", change: "+12.5%", trend: "up", color: "bg-emerald-500" },
  { title: "Total Bookings", value: "256", change: "+8.2%", trend: "up", color: "bg-blue-500" },
  { title: "Active Users", value: "1,489", change: "+5.1%", trend: "up", color: "bg-purple-500" },
  { title: "Services Done", value: "934", change: "+15.3%", trend: "up", color: "bg-orange-500" },
];

export const revenueByMonth = [
  { month: "Jan", revenue: 18400 }, { month: "Feb", revenue: 22100 },
  { month: "Mar", revenue: 27500 }, { month: "Apr", revenue: 31200 },
  { month: "May", revenue: 29800 }, { month: "Jun", revenue: 35600 },
  { month: "Jul", revenue: 41200 }, { month: "Aug", revenue: 38900 },
  { month: "Sep", revenue: 44100 }, { month: "Oct", revenue: 47300 },
  { month: "Nov", revenue: 46800 }, { month: "Dec", revenue: 48250 },
];

export const recentBookings = [
  { id: 1, customer: "Ahmed Khan", service: "Full Detailing", date: "Apr 24, 2026", time: "10:00", status: "Completed", amount: 450 },
  { id: 2, customer: "Sarah Johnson", service: "Ceramic Coating", date: "Apr 23, 2026", time: "14:30", status: "Pending", amount: 1200 },
  { id: 3, customer: "Mohammed Ali", service: "Paint Correction", date: "Apr 23, 2026", time: "09:00", status: "In Progress", amount: 850 },
  { id: 4, customer: "Fatima Ahmed", service: "Interior Cleaning", date: "Apr 22, 2026", time: "16:00", status: "Completed", amount: 250 },
  { id: 5, customer: "John Smith", service: "Wash & Wax", date: "Apr 22, 2026", time: "11:30", status: "Cancelled", amount: 180 },
];

export const users = [
  { id: 1, name: "Ahmed Khan", email: "ahmed.khan@email.com", phone: "+971 50 123 4567", joined: "Jan 15, 2026", bookings: 12, status: "Active", role: "Customer" },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+971 55 234 5678", joined: "Feb 03, 2026", bookings: 8, status: "Active", role: "Customer" },
  { id: 3, name: "Mohammed Ali", email: "m.ali@email.com", phone: "+971 52 345 6789", joined: "Feb 18, 2026", bookings: 15, status: "Active", role: "VIP" },
  { id: 4, name: "Fatima Ahmed", email: "fatima@email.com", phone: "+971 56 456 7890", joined: "Mar 01, 2026", bookings: 5, status: "Active", role: "Customer" },
  { id: 5, name: "John Smith", email: "john.s@email.com", phone: "+971 50 567 8901", joined: "Mar 12, 2026", bookings: 3, status: "Inactive", role: "Customer" },
  { id: 6, name: "Aisha Hassan", email: "aisha.h@email.com", phone: "+971 55 678 9012", joined: "Mar 20, 2026", bookings: 22, status: "Active", role: "VIP" },
  { id: 7, name: "David Wilson", email: "d.wilson@email.com", phone: "+971 52 789 0123", joined: "Apr 02, 2026", bookings: 2, status: "Active", role: "Customer" },
  { id: 8, name: "Layla Mohammed", email: "layla.m@email.com", phone: "+971 56 890 1234", joined: "Apr 10, 2026", bookings: 7, status: "Active", role: "Customer" },
];

export const allBookings = [
  { id: "BK-001", customer: "Ahmed Khan", service: "Full Detailing", vehicle: "Toyota Camry", date: "Apr 24, 2026", time: "10:00", status: "Completed", amount: 450, payment: "Paid" },
  { id: "BK-002", customer: "Sarah Johnson", service: "Ceramic Coating", vehicle: "BMW X5", date: "Apr 23, 2026", time: "14:30", status: "Pending", amount: 1200, payment: "Pending" },
  { id: "BK-003", customer: "Mohammed Ali", service: "Paint Correction", vehicle: "Mercedes C-Class", date: "Apr 23, 2026", time: "09:00", status: "In Progress", amount: 850, payment: "Paid" },
  { id: "BK-004", customer: "Fatima Ahmed", service: "Interior Cleaning", vehicle: "Nissan Patrol", date: "Apr 22, 2026", time: "16:00", status: "Completed", amount: 250, payment: "Paid" },
  { id: "BK-005", customer: "John Smith", service: "Wash & Wax", vehicle: "Honda Civic", date: "Apr 22, 2026", time: "11:30", status: "Cancelled", amount: 180, payment: "Refunded" },
  { id: "BK-006", customer: "Aisha Hassan", service: "Full Detailing", vehicle: "Range Rover Sport", date: "Apr 21, 2026", time: "13:00", status: "Completed", amount: 550, payment: "Paid" },
  { id: "BK-007", customer: "David Wilson", service: "Engine Detailing", vehicle: "Audi Q7", date: "Apr 21, 2026", time: "10:30", status: "Completed", amount: 320, payment: "Paid" },
  { id: "BK-008", customer: "Layla Mohammed", service: "Polish & Wax", vehicle: "Lexus ES", date: "Apr 20, 2026", time: "15:00", status: "Pending", amount: 280, payment: "Pending" },
];

export const services = [
  { id: 1, name: "Full Detailing", category: "Detailing", price: 450, duration: "4 hours", bookings: 156, status: "Active" },
  { id: 2, name: "Ceramic Coating", category: "Protection", price: 1200, duration: "8 hours", bookings: 89, status: "Active" },
  { id: 3, name: "Paint Correction", category: "Detailing", price: 850, duration: "6 hours", bookings: 67, status: "Active" },
  { id: 4, name: "Interior Cleaning", category: "Cleaning", price: 250, duration: "2 hours", bookings: 234, status: "Active" },
  { id: 5, name: "Wash & Wax", category: "Cleaning", price: 180, duration: "1.5 hours", bookings: 412, status: "Active" },
  { id: 6, name: "Engine Detailing", category: "Detailing", price: 320, duration: "2 hours", bookings: 78, status: "Active" },
  { id: 7, name: "Polish & Wax", category: "Detailing", price: 280, duration: "2 hours", bookings: 145, status: "Active" },
  { id: 8, name: "Headlight Restoration", category: "Restoration", price: 150, duration: "1 hour", bookings: 56, status: "Inactive" },
];

export const messages = [
  { id: 1, from: "Ahmed Khan", email: "ahmed.khan@email.com", subject: "Inquiry about Ceramic Coating", preview: "Hi, I'd like to know more about your ceramic coating service and pricing for an SUV...", time: "5 min ago", unread: true, priority: "high" },
  { id: 2, from: "Sarah Johnson", email: "sarah.j@email.com", subject: "Reschedule my booking", preview: "Hello, I need to reschedule my appointment from Friday to Monday next week...", time: "1 hour ago", unread: true, priority: "medium" },
  { id: 3, from: "Mohammed Ali", email: "m.ali@email.com", subject: "Thank you!", preview: "Just wanted to say thank you for the excellent paint correction job. My car looks brand new...", time: "3 hours ago", unread: false, priority: "low" },
  { id: 4, from: "Fatima Ahmed", email: "fatima@email.com", subject: "Question about pricing", preview: "Could you please share the price list for full interior detailing for a 7-seater vehicle...", time: "5 hours ago", unread: true, priority: "medium" },
  { id: 5, from: "John Smith", email: "john.s@email.com", subject: "Refund request", preview: "I'd like to request a refund for my cancelled booking BK-005. Please advise on the process...", time: "Yesterday", unread: false, priority: "high" },
  { id: 6, from: "Aisha Hassan", email: "aisha.h@email.com", subject: "VIP membership inquiry", preview: "I'm interested in your VIP membership program. Could you share the benefits and pricing...", time: "Yesterday", unread: false, priority: "medium" },
];

export const reports = [
  { id: 1, name: "Monthly Revenue Report", type: "Financial", period: "April 2026", generated: "Apr 23, 2026", size: "2.4 MB", format: "PDF" },
  { id: 2, name: "Customer Analytics", type: "Analytics", period: "Q1 2026", generated: "Apr 15, 2026", size: "1.8 MB", format: "Excel" },
  { id: 3, name: "Service Performance", type: "Operations", period: "March 2026", generated: "Apr 02, 2026", size: "3.1 MB", format: "PDF" },
  { id: 4, name: "Booking Trends", type: "Analytics", period: "Q1 2026", generated: "Apr 10, 2026", size: "1.2 MB", format: "PDF" },
  { id: 5, name: "Staff Performance", type: "HR", period: "March 2026", generated: "Apr 05, 2026", size: "890 KB", format: "Excel" },
  { id: 6, name: "Inventory Report", type: "Operations", period: "April 2026", generated: "Apr 20, 2026", size: "1.5 MB", format: "PDF" },
];

export const notifications = [
  { id: 1, title: "New booking received", message: "Ahmed Khan booked Full Detailing for Apr 25", type: "booking", time: "2 min ago", read: false },
  { id: 2, title: "Payment received", message: "AED 1,200 received from Sarah Johnson", type: "payment", time: "15 min ago", read: false },
  { id: 3, title: "New customer registered", message: "Layla Mohammed created an account", type: "user", time: "1 hour ago", read: false },
  { id: 4, title: "Service completed", message: "Paint correction for Mohammed Ali is complete", type: "service", time: "2 hours ago", read: true },
  { id: 5, title: "Low stock alert", message: "Ceramic coating supplies running low", type: "alert", time: "3 hours ago", read: true },
  { id: 6, title: "New review received", message: "Aisha Hassan left a 5-star review", type: "review", time: "5 hours ago", read: true },
  { id: 7, title: "Booking cancelled", message: "John Smith cancelled booking BK-005", type: "booking", time: "Yesterday", read: true },
  { id: 8, title: "System update", message: "Admin panel updated to v2.1.0", type: "system", time: "2 days ago", read: true },
];
