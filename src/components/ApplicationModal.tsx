import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { applicationApi } from '@/services/api';
import { Scholarship, ApplicationDetails } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Calendar, IndianRupee, User, Mail, Phone, MapPin, GraduationCap, CreditCard } from 'lucide-react';

interface ApplicationModalProps {
  scholarship: Scholarship;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  scholarship,
  open,
  onOpenChange,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ApplicationDetails>({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    address: '',
    marks: '',
    institution: '',
    course: '',
    year: '',
    bankAccount: '',
    ifscCode: '',
    documents: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const response = await applicationApi.create(user._id, scholarship._id, formData);
      
      if (response.success) {
        toast({
          title: "Application Submitted Successfully!",
          description: `Your application URN is ${response.data?.urn}. You can track its status in your dashboard.`,
        });
        onOpenChange(false);
        // Reset form
        setFormData({
          fullName: user?.fullName || '',
          email: user?.email || '',
          phone: '',
          dateOfBirth: '',
          address: '',
          marks: '',
          institution: '',
          course: '',
          year: '',
          bankAccount: '',
          ifscCode: '',
          documents: [],
        });
      }
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ApplicationDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for Scholarship</DialogTitle>
          <DialogDescription>
            Complete the application form for <strong>{scholarship.title}</strong>
          </DialogDescription>
        </DialogHeader>

        {/* Scholarship Info */}
        <div className="p-4 bg-muted/50 rounded-lg mb-6">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4 mr-2 text-muted-foreground" />
              <span><strong>Amount:</strong> ₹{scholarship.amount.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
              <span><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</span>
            </div>
            <div className="col-span-2">
              <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Enter your complete address"
                required
              />
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Academic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution/University *</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => handleChange('institution', e.target.value)}
                  placeholder="Enter your institution name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course">Course/Program *</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                  placeholder="e.g., B.Tech Computer Science"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Academic Year *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  placeholder="e.g., 2nd Year, Final Year"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="marks">Academic Performance *</Label>
                <Input
                  id="marks"
                  value={formData.marks}
                  onChange={(e) => handleChange('marks', e.target.value)}
                  placeholder="e.g., 85% or 8.5 CGPA"
                  required
                />
              </div>
            </div>
          </div>

          {/* Bank Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Bank Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account Number *</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) => handleChange('bankAccount', e.target.value)}
                  placeholder="Enter your bank account number"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ifscCode">IFSC Code *</Label>
                <Input
                  id="ifscCode"
                  value={formData.ifscCode}
                  onChange={(e) => handleChange('ifscCode', e.target.value)}
                  placeholder="Enter IFSC code"
                  required
                />
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required Documents</h3>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Please ensure you have the following documents ready for upload:
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Aadhaar Card / Identity Proof</li>
                <li>• Academic Transcripts / Mark Sheets</li>
                <li>• Income Certificate (if applicable)</li>
                <li>• Bank Account Details / Passbook</li>
                <li>• Passport Size Photograph</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                Note: For this demo, document upload is simulated. In a real application, you would upload actual files.
              </p>
            </div>
          </div>

          {/* Declaration */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm">
              <strong>Declaration:</strong> I hereby declare that all the information provided above is true and accurate to the best of my knowledge. 
              I understand that any false information may lead to the rejection of my application.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-hero flex-1"
              disabled={loading}
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};