import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Shield, 
  Banknote, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Star,
  Trophy,
  Target,
  BookOpen,
  Calendar,
  FileText,
  Phone,
  Mail,
  MapPin,
  Globe
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const stats = [
    { number: '50.3K', label: 'Total Students', color: 'text-blue-600' },
    { number: '1000+', label: 'Active Scholarships', color: 'text-green-600' },
    { number: '₹5000Cr+', label: 'Scholarships Awarded', color: 'text-purple-600' },
    { number: '98.7%', label: 'Success Rate', color: 'text-orange-600' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Quality Education Access',
      description: 'Premium educational opportunities',
      stat: '200+ Colleges',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Trophy,
      title: 'Expert Mentorship',
      description: 'Professional guidance and support',
      stat: '100% Merit',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Target,
      title: 'Comprehensive Support',
      description: 'End-to-end assistance',
      stat: '24/7 Support',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: Star,
      title: 'Multi-level Selection',
      description: 'Transparent review process',
      stat: '200+ Courses',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Quality Education Access',
      description: 'Access top-tier educational institutions and programs'
    },
    {
      icon: Users,
      title: 'Comprehensive Support',
      description: 'End-to-end guidance throughout your academic journey'
    },
    {
      icon: Trophy,
      title: 'Multi-level Selection',
      description: 'Fair and transparent selection process'
    }
  ];

  const benefits = [
    'All-India free coverage',
    'Pre-Medical admission',
    'Book and equipment covers',
    'Career guidance programs',
    'Digital library access',
    'Merit-based selection'
  ];

  const notices = [
    {
      type: 'Application',
      title: 'Application for all updates: Gujarat\'s Authorisation launched',
      description: 'New authorization process for Gujarat state scholarships has been launched',
      date: 'March 15, 2024',
      tag: 'HOT'
    },
    {
      type: 'Scholarship',
      title: 'National Scholarship Portal: Application Submission Schedule',
      description: 'Important dates and deadlines for NSP applications',
      date: 'March 12, 2024',
      tag: 'NEW'
    },
    {
      type: 'Update',
      title: 'Post-Matric Scholarship for Academic Year 2024-25',
      description: 'Guidelines and eligibility criteria for post-matric scholarships',
      date: 'March 10, 2024',
      tag: 'HOT'
    },
    {
      type: 'Info',
      title: 'Scholarship for everyone (Class I Update)',
      description: 'Universal scholarship program updates and new features',
      date: 'March 8, 2024',
      tag: 'UPDATE'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ADARSHITI
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About Us</a>
              <a href="#scholarships" className="text-gray-700 hover:text-blue-600 font-medium">Scholarships</a>
              <a href="#programs" className="text-gray-700 hover:text-blue-600 font-medium">Programs</a>
              <a href="#admissions" className="text-gray-700 hover:text-blue-600 font-medium">Admissions</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
              <a href="#more" className="text-gray-700 hover:text-blue-600 font-medium">Contact Support</a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowLogin(true)}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                User Functions
              </Button>
              <Button
                onClick={() => setShowRegister(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                User Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Smarter Education
                  <br />
                  in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Future</span>
                </h1>
                
                <p className="text-xl text-gray-600 max-w-lg">
                  Education isn't just knowledge; it's the power to build 
                  a future, support a mission, and open new chapters in
                  the world.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all"
                >
                  Explore Now
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600"
                >
                  Contact Us
                </Button>
              </div>

              {/* Mini Stats */}
              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">10+ Years</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Students Helped</div>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Scholarship Portal</span>
                    <Badge className="bg-white/20 text-white">Online</Badge>
                  </div>
                  <div className="text-2xl font-bold">₹50000+</div>
                  <div className="text-sm opacity-90">Available Amount</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Application Online</span>
                    </div>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Merit Selection</span>
                    </div>
                    <span className="text-blue-600 font-semibold">47.6%</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Get Started →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                  <div className="font-bold text-gray-900">{feature.stat}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Students Choose PMSSS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why thousands of students trust our platform for their educational journey and scholarship management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Package */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Comprehensive Benefits Package</h2>
              <p className="text-xl mb-8 opacity-90">
                We provide extensive support and benefits to ensure your educational success and financial security throughout your academic journey.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md">
                <div className="flex items-center space-x-4 mb-4">
                  <Calendar className="w-6 h-6" />
                  <div>
                    <div className="font-bold">Application Deadline</div>
                    <div className="text-2xl font-bold">March 31, 2025</div>
                  </div>
                </div>
                <p className="text-sm opacity-90 mb-4">
                  Don't miss out! Submit your application before the deadline.
                </p>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                  Apply Now Submit →
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">200+ Colleges</div>
                  <div className="text-sm opacity-90">Available Options</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">100% Merit</div>
                  <div className="text-sm opacity-90">Based Selection</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">24/7 Support</div>
                  <div className="text-sm opacity-90">Always Available</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">200+ Courses</div>
                  <div className="text-sm opacity-90">Available Programs</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Board */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Notice Board</h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest announcements, deadlines, and important information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {notices.map((notice, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {notice.type}
                        </Badge>
                        <Badge 
                          className={`text-xs ${
                            notice.tag === 'HOT' ? 'bg-red-100 text-red-600' :
                            notice.tag === 'NEW' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {notice.tag}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{notice.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{notice.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{notice.date}</span>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          Read More →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
              View All Notices
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">ADARSHITI</span>
              </div>
              <p className="text-gray-400">
                Empowering students through education and providing pathways to academic excellence.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Scholarships</a></li>
                <li><a href="#" className="hover:text-white">Programs</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Important Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Application Portal</a></li>
                <li><a href="#" className="hover:text-white">Document Upload</a></li>
                <li><a href="#" className="hover:text-white">Status Check</a></li>
                <li><a href="#" className="hover:text-white">Guidelines</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Information</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4" />
                  <span>New Delhi, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4" />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4" />
                  <span>support@adarshiti.gov.in</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="mb-4">Subscribe to our newsletter for latest updates</p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
                />
                <Button className="bg-white text-blue-600 px-6 py-2 rounded-r-lg hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </div>
            <p className="text-gray-400">
              © 2024 ADARSHITI. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Login</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogin(false)}
              >
                ✕
              </Button>
            </div>
            <LoginForm onSwitchToRegister={() => {
              setShowLogin(false);
              setShowRegister(true);
            }} />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Register</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRegister(false)}
              >
                ✕
              </Button>
            </div>
            <RegisterForm onSwitchToLogin={() => {
              setShowRegister(false);
              setShowLogin(true);
            }} />
          </div>
        </div>
      )}
    </div>
  );
};