
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AdminProvider } from "@/context/AdminContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AdminProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
