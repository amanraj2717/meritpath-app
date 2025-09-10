// Mock API service for demonstration - In production, replace with actual backend calls
import { 
  User, 
  LoginData, 
  RegisterData, 
  Scholarship, 
  Application, 
  ApplicationDetails,
  ApiResponse,
  DashboardStats 
} from '@/types';

// Mock data storage (In production, this would be handled by backend)
let mockUsers: User[] = [
  {
    _id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    fullName: 'John Doe',
    role: 'USER',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    username: 'sag_admin',
    email: 'sag@example.com',
    fullName: 'SAG Administrator',
    role: 'SAG',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    username: 'finance_admin',
    email: 'finance@example.com',
    fullName: 'Finance Administrator',
    role: 'FINANCE',
    createdAt: new Date().toISOString(),
  },
];

let mockScholarships: Scholarship[] = [
  {
    _id: '1',
    title: 'National Merit Scholarship',
    description: 'Scholarship for academically excellent students with financial need',
    eligibility: 'Above 75% marks, Annual family income below ₹5 lakhs',
    amount: 50000,
    deadline: '2025-03-31',
    category: 'Merit-based',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Minority Community Scholarship',
    description: 'Support for students from minority communities',
    eligibility: 'Above 60% marks, Belong to minority community',
    amount: 30000,
    deadline: '2025-04-15',
    category: 'Community-based',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Sports Excellence Scholarship',
    description: 'For students excelling in sports at state/national level',
    eligibility: 'State/National level sports achievement, Above 50% marks',
    amount: 75000,
    deadline: '2025-05-01',
    category: 'Sports',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

let mockApplications: Application[] = [];
let urnCounter = 1;

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique URN
const generateURN = (): string => {
  const year = new Date().getFullYear();
  const urn = `SCH-${year}-${String(urnCounter).padStart(4, '0')}`;
  urnCounter++;
  return urn;
};

// Auth API
export const authApi = {
  async login(data: LoginData): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(1000);
    
    const user = mockUsers.find(u => u.username === data.username);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    // In production, verify password hash
    const token = 'mock-jwt-token-' + Date.now();
    
    return {
      success: true,
      data: { user, token },
      message: 'Login successful'
    };
  },

  async register(data: RegisterData): Promise<ApiResponse<User>> {
    await delay(1000);
    
    if (mockUsers.find(u => u.username === data.username)) {
      return { success: false, message: 'Username already exists' };
    }
    
    if (mockUsers.find(u => u.email === data.email)) {
      return { success: false, message: 'Email already exists' };
    }
    
    const newUser: User = {
      _id: (mockUsers.length + 1).toString(),
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      role: 'USER',
      createdAt: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    return {
      success: true,
      data: newUser,
      message: 'Registration successful'
    };
  },
};

// Scholarship API
export const scholarshipApi = {
  async getAll(): Promise<ApiResponse<Scholarship[]>> {
    await delay(500);
    return {
      success: true,
      data: mockScholarships.filter(s => s.isActive),
      message: 'Scholarships fetched successfully'
    };
  },

  async getById(id: string): Promise<ApiResponse<Scholarship>> {
    await delay(300);
    const scholarship = mockScholarships.find(s => s._id === id);
    
    if (!scholarship) {
      return { success: false, message: 'Scholarship not found' };
    }
    
    return {
      success: true,
      data: scholarship,
      message: 'Scholarship fetched successfully'
    };
  },
};

// Application API
export const applicationApi = {
  async create(userId: string, schemeId: string, details: ApplicationDetails): Promise<ApiResponse<Application>> {
    await delay(1000);
    
    const scholarship = mockScholarships.find(s => s._id === schemeId);
    if (!scholarship) {
      return { success: false, message: 'Scholarship not found' };
    }
    
    const newApplication: Application = {
      _id: (mockApplications.length + 1).toString(),
      userId,
      schemeId,
      scholarship,
      details,
      urn: generateURN(),
      status: 'PENDING',
      remarks: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockApplications.push(newApplication);
    
    return {
      success: true,
      data: newApplication,
      message: 'Application submitted successfully'
    };
  },

  async getByUserId(userId: string): Promise<ApiResponse<Application[]>> {
    await delay(500);
    const userApplications = mockApplications
      .filter(app => app.userId === userId)
      .map(app => ({
        ...app,
        scholarship: mockScholarships.find(s => s._id === app.schemeId)
      }));
    
    return {
      success: true,
      data: userApplications,
      message: 'Applications fetched successfully'
    };
  },

  async getPendingForSAG(): Promise<ApiResponse<Application[]>> {
    await delay(500);
    const pendingApplications = mockApplications
      .filter(app => app.status === 'PENDING')
      .map(app => ({
        ...app,
        scholarship: mockScholarships.find(s => s._id === app.schemeId)
      }));
    
    return {
      success: true,
      data: pendingApplications,
      message: 'Pending applications fetched successfully'
    };
  },

  async getApprovedForFinance(): Promise<ApiResponse<Application[]>> {
    await delay(500);
    const approvedApplications = mockApplications
      .filter(app => app.status === 'SAG_APPROVED')
      .map(app => ({
        ...app,
        scholarship: mockScholarships.find(s => s._id === app.schemeId)
      }));
    
    return {
      success: true,
      data: approvedApplications,
      message: 'SAG approved applications fetched successfully'
    };
  },

  async updateStatus(
    applicationId: string, 
    status: 'SAG_APPROVED' | 'FINANCE_APPROVED' | 'REJECTED',
    remarks: string,
    reviewedBy: string,
    transferAmount?: number
  ): Promise<ApiResponse<Application>> {
    await delay(1000);
    
    const application = mockApplications.find(app => app._id === applicationId);
    if (!application) {
      return { success: false, message: 'Application not found' };
    }
    
    application.status = status;
    application.remarks = remarks;
    application.updatedAt = new Date().toISOString();
    
    if (status === 'SAG_APPROVED') {
      application.sagReviewedAt = new Date().toISOString();
      application.sagReviewedBy = reviewedBy;
    } else if (status === 'FINANCE_APPROVED') {
      application.financeReviewedAt = new Date().toISOString();
      application.financeReviewedBy = reviewedBy;
      application.transferAmount = transferAmount;
    }
    
    return {
      success: true,
      data: application,
      message: 'Application status updated successfully'
    };
  },
};

// Dashboard API
export const dashboardApi = {
  async getStats(userId?: string): Promise<ApiResponse<DashboardStats>> {
    await delay(500);
    
    let applications = mockApplications;
    if (userId) {
      applications = applications.filter(app => app.userId === userId);
    }
    
    const stats: DashboardStats = {
      totalApplications: applications.length,
      pendingApplications: applications.filter(app => app.status === 'PENDING').length,
      approvedApplications: applications.filter(app => app.status === 'FINANCE_APPROVED').length,
      rejectedApplications: applications.filter(app => app.status === 'REJECTED').length,
      totalScholarships: mockScholarships.filter(s => s.isActive).length,
      totalAmount: applications
        .filter(app => app.status === 'FINANCE_APPROVED')
        .reduce((sum, app) => sum + (app.transferAmount || 0), 0),
    };
    
    return {
      success: true,
      data: stats,
      message: 'Dashboard stats fetched successfully'
    };
  },
};