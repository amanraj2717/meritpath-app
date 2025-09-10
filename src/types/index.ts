// Core Types for Scholarship Management System

export type UserRole = 'USER' | 'SAG' | 'FINANCE';

export type ApplicationStatus = 'PENDING' | 'SAG_APPROVED' | 'FINANCE_APPROVED' | 'REJECTED';

export interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
}

export interface Scholarship {
  _id: string;
  title: string;
  description: string;
  eligibility: string;
  amount: number;
  deadline: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

export interface ApplicationDetails {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  marks: string;
  institution: string;
  course: string;
  year: string;
  bankAccount: string;
  ifscCode: string;
  documents: string[];
}

export interface Application {
  _id: string;
  userId: string;
  schemeId: string;
  scholarship?: Scholarship;
  details: ApplicationDetails;
  urn: string;
  status: ApplicationStatus;
  remarks: string;
  transferAmount?: number;
  sagReviewedAt?: string;
  sagReviewedBy?: string;
  financeReviewedAt?: string;
  financeReviewedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  totalScholarships: number;
  totalAmount: number;
}