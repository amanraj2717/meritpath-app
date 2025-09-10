import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { applicationApi, dashboardApi } from '@/services/api';
import { Application, DashboardStats } from '@/types';
import { 
  Banknote, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  FileText,
  CreditCard,
  IndianRupee,
  Send,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FinanceDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sagApprovedApplications, setSagApprovedApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});
  const [transferAmounts, setTransferAmounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [applicationsResponse, statsResponse] = await Promise.all([
        applicationApi.getApprovedForFinance(),
        dashboardApi.getStats(),
      ]);

      if (applicationsResponse.success && applicationsResponse.data) {
        setSagApprovedApplications(applicationsResponse.data);
        // Initialize transfer amounts with scholarship amounts
        const amounts: { [key: string]: number } = {};
        applicationsResponse.data.forEach(app => {
          amounts[app._id] = app.scholarship?.amount || 0;
        });
        setTransferAmounts(amounts);
      }

      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching Finance dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinanceApprove = async (applicationId: string) => {
    if (!user || !transferAmounts[applicationId]) {
      toast({
        title: "Transfer Amount Required",
        description: "Please specify the transfer amount",
        variant: "destructive",
      });
      return;
    }
    
    setProcessingId(applicationId);
    try {
      const response = await applicationApi.updateStatus(
        applicationId,
        'FINANCE_APPROVED',
        remarks[applicationId] || 'Approved by Finance Bureau and payment processed',
        user.fullName,
        transferAmounts[applicationId]
      );

      if (response.success) {
        toast({
          title: "Application Approved & Payment Processed",
          description: `₹${transferAmounts[applicationId].toLocaleString()} has been transferred to the student`,
        });
        
        // Remove from SAG approved list
        setSagApprovedApplications(prev => prev.filter(app => app._id !== applicationId));
        
        // Clear form data
        setRemarks(prev => {
          const newRemarks = { ...prev };
          delete newRemarks[applicationId];
          return newRemarks;
        });
        setTransferAmounts(prev => {
          const newAmounts = { ...prev };
          delete newAmounts[applicationId];
          return newAmounts;
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleFinanceReject = async (applicationId: string) => {
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
          description: "Application has been rejected by Finance Bureau",
        });
        
        // Remove from SAG approved list
        setSagApprovedApplications(prev => prev.filter(app => app._id !== applicationId));
        
        // Clear form data
        setRemarks(prev => {
          const newRemarks = { ...prev };
          delete newRemarks[applicationId];
          return newRemarks;
        });
        setTransferAmounts(prev => {
          const newAmounts = { ...prev };
          delete newAmounts[applicationId];
          return newAmounts;
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

  const updateTransferAmount = (applicationId: string, value: number) => {
    setTransferAmounts(prev => ({
      ...prev,
      [applicationId]: value,
    }));
  };

  const initiatePayment = (application: Application) => {
    // In a real application, this would integrate with payment gateways
    // For demo purposes, we'll show a mock payment interface
    const amount = transferAmounts[application._id];
    const url = `https://demo-payment-gateway.com/transfer?amount=${amount}&account=${application.details.bankAccount}&ifsc=${application.details.ifscCode}&name=${encodeURIComponent(application.details.fullName)}`;
    
    // Open in new tab for demo
    window.open(url, '_blank');
    
    toast({
      title: "Payment Gateway Opened",
      description: `Redirected to payment gateway for ₹${amount.toLocaleString()} transfer`,
    });
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
        <h1 className="text-3xl font-bold">Finance Bureau Dashboard</h1>
        <p className="text-muted-foreground">
          Process final approvals and manage scholarship payments.
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SAG Approved</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{sagApprovedApplications.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting finance approval</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.approvedApplications}</div>
              <p className="text-xs text-muted-foreground">Payments processed</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹{stats.totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Successfully transferred</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <Banknote className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                ₹{sagApprovedApplications.reduce((sum, app) => sum + (transferAmounts[app._id] || 0), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting transfer</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SAG Approved Applications */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>SAG Approved Applications ({sagApprovedApplications.length})</CardTitle>
          <CardDescription>
            Review SAG approved applications and process final payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sagApprovedApplications.length > 0 ? (
            sagApprovedApplications.map((application) => (
              <div key={application._id} className="p-6 border border-border rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {application.scholarship?.title || 'Scholarship Application'}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>URN: {application.urn}</span>
                      <span>•</span>
                      <span>SAG Approved: {application.sagReviewedAt ? new Date(application.sagReviewedAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                  <Badge className="badge-sag-approved">
                    SAG Approved
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Beneficiary Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {application.details.fullName}</p>
                      <p><strong>Email:</strong> {application.details.email}</p>
                      <p><strong>Phone:</strong> {application.details.phone}</p>
                      <p><strong>Bank Account:</strong> {application.details.bankAccount}</p>
                      <p><strong>IFSC Code:</strong> {application.details.ifscCode}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Scholarship Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Category:</strong> {application.scholarship?.category}</p>
                      <p><strong>Original Amount:</strong> ₹{application.scholarship?.amount.toLocaleString()}</p>
                      <p><strong>Institution:</strong> {application.details.institution}</p>
                      <p><strong>Course:</strong> {application.details.course}</p>
                      <p><strong>Academic Performance:</strong> {application.details.marks}</p>
                    </div>
                  </div>
                </div>

                {application.remarks && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">SAG Remarks:</h4>
                    <p className="text-sm text-muted-foreground">{application.remarks}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`amount-${application._id}`}>Transfer Amount (₹)</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`amount-${application._id}`}
                        type="number"
                        value={transferAmounts[application._id] || ''}
                        onChange={(e) => updateTransferAmount(application._id, Number(e.target.value))}
                        className="pl-10"
                        placeholder="Enter transfer amount"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Quick Payment Actions</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => initiatePayment(application)}
                        disabled={!transferAmounts[application._id]}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Payment Gateway
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://demo-bank-transfer.com', '_blank')}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Bank Transfer
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`remarks-${application._id}`}>Finance Remarks</Label>
                  <Textarea
                    id={`remarks-${application._id}`}
                    placeholder="Add your finance review comments here..."
                    value={remarks[application._id] || ''}
                    onChange={(e) => updateRemarks(application._id, e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => handleFinanceApprove(application._id)}
                    disabled={processingId === application._id || !transferAmounts[application._id]}
                    className="bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {processingId === application._id ? 'Processing...' : 'Approve & Transfer'}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    onClick={() => handleFinanceReject(application._id)}
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
              <Banknote className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No applications for finance review</h3>
              <p className="text-muted-foreground">
                SAG approved applications will appear here for final processing.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};