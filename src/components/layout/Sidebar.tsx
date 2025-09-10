import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  Clock, 
  CheckCircle, 
  Banknote,
  Users,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const userNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: GraduationCap, label: 'Browse Scholarships', path: '/scholarships' },
  { icon: FileText, label: 'My Applications', path: '/applications' },
  { icon: Clock, label: 'Application History', path: '/history' },
];

const sagNavItems = [
  { icon: LayoutDashboard, label: 'SAG Dashboard', path: '/dashboard' },
  { icon: Clock, label: 'Pending Applications', path: '/sag/pending' },
  { icon: CheckCircle, label: 'Reviewed Applications', path: '/sag/reviewed' },
  { icon: BarChart3, label: 'Reports', path: '/sag/reports' },
];

const financeNavItems = [
  { icon: LayoutDashboard, label: 'Finance Dashboard', path: '/dashboard' },
  { icon: CheckCircle, label: 'SAG Approved', path: '/finance/approved' },
  { icon: Banknote, label: 'Payment Processing', path: '/finance/payments' },
  { icon: Users, label: 'Payment History', path: '/finance/history' },
  { icon: BarChart3, label: 'Reports', path: '/finance/reports' },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const getNavItems = () => {
    switch (user.role) {
      case 'SAG':
        return sagNavItems;
      case 'FINANCE':
        return financeNavItems;
      default:
        return userNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-muted/30 border-r border-border/40 p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};