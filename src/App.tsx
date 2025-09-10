import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { UserDashboard } from "./pages/UserDashboard";
import { ScholarshipBrowser } from "./pages/ScholarshipBrowser";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { SAGDashboard } from "./pages/SAGDashboard";
import { FinanceDashboard } from "./pages/FinanceDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Dashboard Router Component
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  // Role-based dashboard routing
  switch (user.role) {
    case 'SAG':
      return <SAGDashboard />;
    case 'FINANCE':
      return <FinanceDashboard />;
    default:
      return <UserDashboard />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardRouter />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* User Routes */}
            <Route path="/scholarships" element={
              <ProtectedRoute allowedRoles={['USER']}>
                <DashboardLayout>
                  <ScholarshipBrowser />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/applications" element={
              <ProtectedRoute allowedRoles={['USER']}>
                <DashboardLayout>
                  <ApplicationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/history" element={
              <ProtectedRoute allowedRoles={['USER']}>
                <DashboardLayout>
                  <ApplicationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* SAG Routes */}
            <Route path="/sag/*" element={
              <ProtectedRoute allowedRoles={['SAG']}>
                <DashboardLayout>
                  <SAGDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Finance Routes */}
            <Route path="/finance/*" element={
              <ProtectedRoute allowedRoles={['FINANCE']}>
                <DashboardLayout>
                  <FinanceDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
