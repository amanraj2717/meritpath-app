import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { GraduationCap, Shield, Banknote, Users, ArrowRight, CheckCircle } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);

  const features = [
    {
      icon: GraduationCap,
      title: 'Browse Scholarships',
      description: 'Discover various scholarship opportunities tailored to your academic achievements',
    },
    {
      icon: Shield,
      title: 'Secure Applications',
      description: 'Submit applications with confidence through our secure and verified system',
    },
    {
      icon: Banknote,
      title: 'Track Payments',
      description: 'Monitor your application status and payment processing in real-time',
    },
    {
      icon: Users,
      title: 'Multi-level Review',
      description: 'Transparent review process through SAG and Finance bureau verification',
    },
  ];

  const benefits = [
    'Real-time application tracking',
    'Secure document upload',
    'Multiple scholarship categories',
    'Instant status notifications',
    'Direct payment processing',
    'Professional review system',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ScholarshipHub
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Your Gateway to{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Educational Excellence
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Streamlined scholarship management system connecting students with opportunities 
                through secure, transparent, and efficient processes.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl card-gradient hover:card-featured transition-all duration-300 group"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Why Choose Our Platform?</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button for Mobile */}
            <div className="lg:hidden">
              <button className="btn-hero flex items-center space-x-2">
                <span>Get Started Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right side - Auth Forms */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {showRegister ? (
                <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
              ) : (
                <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-muted-foreground">Students Helped</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">₹50M+</div>
              <div className="text-muted-foreground">Scholarships Distributed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-muted-foreground">Active Scholarships</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};