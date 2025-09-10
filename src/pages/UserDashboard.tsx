import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardApi, applicationApi } from '@/services/api';
import { DashboardStats, Application } from '@/types';
import { 
  GraduationCap, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const [statsResponse, applicationsResponse] = await Promise.all([
          dashboardApi.getStats(user._id),
          applicationApi.getByUserId(user._id),
        ]);

        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data);
        }

        if (applicationsResponse.success && applicationsResponse.data) {
          setRecentApplications(applicationsResponse.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'SAG_APPROVED':
        return <CheckCircle className="w-4 h-4 text-primary" />;
      case 'FINANCE_APPROVED':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'REJECTED':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'badge-pending';
      case 'SAG_APPROVED':
        return 'badge-sag-approved';
      case 'FINANCE_APPROVED':
        return 'badge-finance-approved';
      case 'REJECTED':
        return 'badge-rejected';
      default:
        return 'badge-pending';
    }
  };

  const quickActions = [
    {
      title: 'Browse Scholarships',
      description: 'Discover new scholarship opportunities',
      icon: GraduationCap,
      action: () => navigate('/scholarships'),
      gradient: 'from-primary to-primary-light',
    },
    {
      title: 'View Applications',
      description: 'Track your submitted applications',
      icon: FileText,
      action: () => navigate('/applications'),
      gradient: 'from-secondary to-secondary-light',
    },
    {
      title: 'Application History',
      description: 'Review your complete application history',
      icon: Clock,
      action: () => navigate('/history'),
      gradient: 'from-success to-success-light',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {user?.fullName}!</h1>
        <p className="text-muted-foreground">
          Track your scholarship applications and discover new opportunities.
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">Submitted to date</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pendingApplications}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.approvedApplications}</div>
              <p className="text-xs text-muted-foreground">Successfully approved</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹{stats.totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Approved scholarships</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={action.action}
                className="p-4 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.gradient} flex items-center justify-center`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your latest scholarship applications</CardDescription>
          </CardHeader>
          <CardContent>
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application._id}
                    className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">
                          {application.scholarship?.title || 'Scholarship'}
                        </h4>
                        <p className="text-xs text-muted-foreground">URN: {application.urn}</p>
                        <p className="text-xs text-muted-foreground">
                          Applied: {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(application.status)}
                        <span className={`text-xs px-2 py-1 rounded-md ${getStatusBadge(application.status)}`}>
                          {application.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/applications')}
                >
                  View All Applications
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No applications yet</p>
                <Button className="mt-4" onClick={() => navigate('/scholarships')}>
                  Browse Scholarships
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};