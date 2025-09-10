import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { scholarshipApi } from '@/services/api';
import { Scholarship } from '@/types';
import { Search, Calendar, IndianRupee, Users, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ApplicationModal } from '@/components/ApplicationModal';

export const ScholarshipBrowser: React.FC = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await scholarshipApi.getAll();
        if (response.success && response.data) {
          setScholarships(response.data);
          setFilteredScholarships(response.data);
        }
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  useEffect(() => {
    const filtered = scholarships.filter(scholarship =>
      scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredScholarships(filtered);
  }, [searchTerm, scholarships]);

  const handleApply = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setShowApplicationModal(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'merit-based':
        return 'badge-finance-approved';
      case 'community-based':
        return 'badge-sag-approved';
      case 'sports':
        return 'badge-pending';
      default:
        return 'badge-pending';
    }
  };

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 30;
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
        <h1 className="text-3xl font-bold">Browse Scholarships</h1>
        <p className="text-muted-foreground">
          Discover scholarship opportunities that match your profile and goals.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="card-gradient">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scholarships by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filter by Category
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredScholarships.length} scholarship{filteredScholarships.length !== 1 ? 's' : ''}
      </div>

      {/* Scholarships Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredScholarships.map((scholarship) => (
          <Card key={scholarship._id} className="card-featured hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge className={getCategoryColor(scholarship.category)}>
                    {scholarship.category}
                  </Badge>
                  {isDeadlineNear(scholarship.deadline) && (
                    <Badge className="badge-rejected">
                      Deadline Soon
                    </Badge>
                  )}
                </div>
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{scholarship.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {scholarship.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  <span className="font-medium text-foreground">₹{scholarship.amount.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-start text-sm">
                  <Users className="w-4 h-4 mr-1 mt-0.5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    <strong>Eligibility:</strong> {scholarship.eligibility}
                  </span>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="w-full btn-hero"
                  onClick={() => handleApply(scholarship)}
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredScholarships.length === 0 && (
        <Card className="card-gradient">
          <CardContent className="py-12 text-center">
            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or check back later for new opportunities.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Application Modal */}
      {selectedScholarship && (
        <ApplicationModal
          scholarship={selectedScholarship}
          open={showApplicationModal}
          onOpenChange={setShowApplicationModal}
        />
      )}
    </div>
  );
};