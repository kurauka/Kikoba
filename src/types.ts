export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Chama {
  id: string;
  name: string;
  description: string;
  treasurerId: string;
  createdAt: string;
  totalSavings: number;
  memberCount: number;
}

export interface Member {
  id: string;
  userId: string;
  displayName: string;
  role: 'treasurer' | 'member';
  joinedAt: string;
  totalContributed: number;
}

export interface Contribution {
  id: string;
  userId: string;
  amount: number;
  timestamp: string;
  status: 'pending' | 'completed';
  paymentReference?: string;
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  interestRate: number;
  status: 'requested' | 'active' | 'repaid' | 'defaulted';
  dueDate: string;
  requestedAt: string;
  approvedAt?: string;
}

export interface MerrigoGroup {
  id: string;
  chamaId: string;
  amount: number;
  frequency: number; // days
  rotationOrder: string[]; // userIds
  currentIndex: number;
  isActive: boolean;
  startDate: string;
}
