import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { applicationApi } from '@/services/api';
import { Application } from '@/types';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  IndianRupee,
  ExternalLink,
  Download,
} from 'lucide-react';

export const ApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;
      
      try {
        const response = await applicationApi.getByUserId(user._id);
        if (response.success && response.data) {
          setApplications(response.data);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Under Review';
      case 'SAG_APPROVED':
        return 'SAG Approved';
      case 'FINANCE_APPROVED':
        return 'Approved & Funded';
      case 'REJECTED':
        return 'Rejected';
      default:
        return status;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'pending') return app.status === 'PENDING';
    if (filter === 'approved') return app.status === 'FINANCE_APPROVED';
    if (filter === 'rejected') return app.status === 'REJECTED';
    return true;
  });

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
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">
          Track the status of your scholarship applications and view detailed information.
        </p>
      </div>

      {/* Filter Tabs */}
      <Card className="card-gradient">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Applications' },
              { key: 'pending', label: 'Under Review' },
              { key: 'approved', label: 'Approved' },
              { key: 'rejected', label: 'Rejected' },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(key as any)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <Card key={application._id} className="card-gradient hover:card-featured transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">
                      {application.scholarship?.title || 'Scholarship Application'}
                    </CardTitle>
                    <CardDescription>
                      URN: {application.urn}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(application.status)}
                    <Badge className={getStatusBadge(application.status)}>
                      {getStatusText(application.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Applied:</span>
                      <span className="ml-1 font-medium">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {application.scholarship && (
                      <div className="flex items-center text-sm">
                        <IndianRupee className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="ml-1 font-medium">
                          ₹{application.scholarship.amount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    {application.transferAmount && (
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 text-success" />
                        <span className="text-muted-foreground">Approved Amount:</span>
                        <span className="ml-1 font-medium text-success">
                          ₹{application.transferAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Category:</span>
                      <span className="ml-1 font-medium">
                        {application.scholarship?.category || 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="ml-1 font-medium">
                        {new Date(application.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {application.remarks && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Remarks:</h4>
                    <p className="text-sm text-muted-foreground">{application.remarks}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="card-gradient">
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No applications found</h3>
              <p className="text-muted-foreground mb-4">
                {filter === 'all' 
                  ? "You haven't submitted any scholarship applications yet."
                  : `No applications with ${filter} status.`
                }
              </p>
              <Button onClick={() => window.location.href = '/scholarships'}>
                Browse Scholarships
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};