import React from 'react';

export interface Feature {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

export interface Student {
    name: string;
    domain: string;
    companyLogo: string;
    imageUrl: string;
    story: string;
}

export interface Program {
    id: number;
    title: string;
    category: 'Course' | 'Fellowship';
    description: string;
    tags: string[];
}


export interface BlogPost {
    slug: string;
    title: string;
    author: string;
    authorImage: string;
    date: string;
    imageUrl: string;
    excerpt: string;
    content: React.ReactNode;
    rawContent?: string;
}

export interface CertificateDetails {
    studentName: string;
    domain: string;
    issueDate: string;
    pdfLink: string;
}

export interface Applicant {
    name: string;
    email: string;
    phone: string;
    programName: string;
}

export interface PaymentDetails {
    applicationId?: number;
    internId?: number;
    paymentId: string;
    orderId?: string;
    signature?: string;
    amount: number;
    status: 'success' | 'failed';
    method?: string;
}

export interface User {
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export interface Intern {
  id: number;
  created_at: string;
  name: string;
  email: string;
  program: string;
  notes: string | null;
}

export interface Partner {
    name: string;
    logoUrl: string;
    description: string;
    websiteUrl: string;
}