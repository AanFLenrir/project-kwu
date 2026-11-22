// KAIROS Type Definitions

export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type InfoCategory = 'academic' | 'announcement' | 'scholarship' | 'internship' | 'competition' | 'certification' | 'career';
export type CourseStatus = 'active' | 'completed' | 'paused';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  nim: string;
  program: string;
  university: string;
  semester: number;
  phone?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  subject: string;
  priority: Priority;
  status: TaskStatus;
  deadline: string; // ISO date string
  estimatedHours: number;
  weight: number; // 0-100, bobot penilaian
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO date string
  startTime?: string;
  endTime?: string;
  location?: string;
  type: 'class' | 'exam' | 'deadline' | 'event' | 'meeting';
  color?: string;
}

export interface InformationItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: InfoCategory;
  source: string;
  imageUrl?: string;
  publishedAt: string;
  deadline?: string;
  tags: string[];
  isBookmarked?: boolean;
  link?: string;
}

export interface CareerOpportunity {
  id: string;
  company: string;
  position: string;
  location: string;
  type: 'internship' | 'full-time' | 'part-time' | 'freelance' | 'contract';
  description: string;
  requirements: string[];
  benefits?: string[];
  salary?: string;
  deadline: string;
  postedAt: string;
  logoUrl?: string;
  tags: string[];
  isRemote: boolean;
}

export interface Course {
  id: string;
  title: string;
  platform: string;
  instructor?: string;
  description?: string;
  progress: number; // 0-100
  status: CourseStatus;
  category: string;
  totalModules: number;
  completedModules: number;
  startedAt: string;
  estimatedHours: number;
  imageUrl?: string;
  url?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  expiresAt?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  skills: string[];
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  githubUrl?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  completedAt?: string;
}

export interface Portfolio {
  bio: string;
  skills: string[];
  projects: PortfolioItem[];
  achievements: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'task' | 'info' | 'system' | 'reminder' | 'achievement';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface AppState {
  user: User;
  tasks: Task[];
  events: CalendarEvent[];
  information: InformationItem[];
  careers: CareerOpportunity[];
  courses: Course[];
  certificates: Certificate[];
  portfolio: Portfolio;
  notifications: Notification[];
}
