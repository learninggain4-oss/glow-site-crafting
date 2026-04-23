import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
const Account = lazy(() => import("./pages/Account"));
const PriceCalculator = lazy(() => import("./pages/PriceCalculator"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/account" element={<Account />} />
          <Route path="/price-calculator" element={<PriceCalculator />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
