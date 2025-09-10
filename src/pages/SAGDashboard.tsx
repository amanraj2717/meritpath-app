import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { applicationApi, dashboardApi } from '@/services/api';
import { Application, DashboardStats } from '@/types';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText,
  Users,
  TrendingUp,
  Calendar,
  IndianRupee,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SAGDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pendingApplications, setPendingApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [applicationsResponse, statsResponse] = await Promise.all([
        applicationApi.getPendingForSAG(),
        dashboardApi.getStats(),
      ]);

      if (applicationsResponse.success && applicationsResponse.data) {
        setPendingApplications(applicationsResponse.data);
      }

      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching SAG dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (applicationId: string) => {
    if (!user) return;
    
    setProcessingId(applicationId);
    try {
      const response = await applicationApi.updateStatus(
        applicationId,
        'SAG_APPROVED',
        remarks[applicationId] || 'Approved by SAG Bureau',
        user.fullName
      );

      if (response.success) {
        toast({
          title: "Application Approved",
          description: "Application has been approved and forwarded to Finance Bureau",
        });
        
        // Remove from pending list
        setPendingApplications(prev => prev.filter(app => app._id !== applicationId));
        
        // Clear remarks
        setRemarks(prev => {
          const newRemarks = { ...prev };
          delete newRemarks[applicationId];
          return newRemarks;
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve application",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (applicationId: string) => {
    if (!user || !remarks[applicationId]?.trim()) {
      toast({
        title: "Remarks Required",
        description: "Please provide remarks for rejection",
        variant: "destructive",
      });
      return;
    }
    
    setProcessingId(applicationId);
    try {
      const response = await applicationApi.updateStatus(
        applicationId,
        'REJECTED',
        remarks[applicationId],
        user.fullName
      );

      if (response.success) {
        toast({
          title: "Application Rejected",
          description: "Application has been rejected with remarks",
        });
        
        // Remove from pending list
        setPendingApplications(prev => prev.filter(app => app._id !== applicationId));
        
        // Clear remarks
        setRemarks(prev => {
          const newRemarks = { ...prev };
          delete newRemarks[applicationId];
          return newRemarks;
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const updateRemarks = (applicationId: string, value: string) => {
    setRemarks(prev => ({
      ...prev,
      [applicationId]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">SAG Bureau Dashboard</h1>
        <p className="text-muted-foreground">
          Review and process scholarship applications for initial approval.
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{pendingApplications.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting SAG review</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">All time submissions</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Applications</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.approvedApplications}</div>
              <p className="text-xs text-muted-foreground">Successfully processed</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹{stats.totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Approved scholarships</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pending Applications */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Pending Applications ({pendingApplications.length})</CardTitle>
          <CardDescription>
            Review applications and provide initial approval or rejection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {pendingApplications.length > 0 ? (
            pendingApplications.map((application) => (
              <div key={application._id} className="p-6 border border-border rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {application.scholarship?.title || 'Scholarship Application'}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>URN: {application.urn}</span>
                      <span>•</span>
                      <span>Applied: {new Date(application.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge className="badge-pending">
                    Pending Review
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Applicant Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {application.details.fullName}</p>
                      <p><strong>Email:</strong> {application.details.email}</p>
                      <p><strong>Phone:</strong> {application.details.phone}</p>
                      <p><strong>Institution:</strong> {application.details.institution}</p>
                      <p><strong>Course:</strong> {application.details.course}</p>
                      <p><strong>Year:</strong> {application.details.year}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Academic & Financial Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Marks:</strong> {application.details.marks}</p>
                      <p><strong>Bank Account:</strong> {application.details.bankAccount}</p>
                      <p><strong>IFSC Code:</strong> {application.details.ifscCode}</p>
                      {application.scholarship && (
                        <div className="flex items-center pt-2">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          <span className="font-medium">₹{application.scholarship.amount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Remarks</label>
                  <Textarea
                    placeholder="Add your review comments here..."
                    value={remarks[application._id] || ''}
                    onChange={(e) => updateRemarks(application._id, e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => handleApprove(application._id)}
                    disabled={processingId === application._id}
                    className="bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {processingId === application._id ? 'Processing...' : 'Approve'}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(application._id)}
                    disabled={processingId === application._id || !remarks[application._id]?.trim()}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {processingId === application._id ? 'Processing...' : 'Reject'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No pending applications</h3>
              <p className="text-muted-foreground">
                All applications have been reviewed. New applications will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};