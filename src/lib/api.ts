
import prisma from './prisma';
import { InternshipFormData } from '@/types/company';

// User related functions
export async function createUser(email: string, password: string, role: string) {
  return prisma.user.create({
    data: {
      email,
      password, // Note: In production, ensure password is hashed
      role,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      student: true,
      company: true,
    },
  });
}

// Company related functions
export async function createCompany(userId: string, companyData: { name: string, [key: string]: any }) {
  return prisma.company.create({
    data: {
      userId,
      ...companyData,
    },
  });
}

export async function updateCompany(id: string, data: any) {
  return prisma.company.update({
    where: { id },
    data,
  });
}

export async function getCompanyByUserId(userId: string) {
  return prisma.company.findUnique({
    where: { userId },
  });
}

// Internship related functions
export async function createInternship(companyId: string, data: InternshipFormData) {
  return prisma.internship.create({
    data: {
      companyId,
      title: data.title,
      location: data.location,
      type: data.type,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      salary: data.salary,
      description: data.description,
      responsibilities: data.responsibilities,
      requirements: data.requirements,
      skills: data.skills,
      applicationDeadline: new Date(data.applicationDeadline),
      positions: data.positions,
    },
  });
}

export async function getInternshipsByCompany(companyId: string) {
  return prisma.internship.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { applications: true },
      },
    },
  });
}

export async function getInternship(id: string) {
  return prisma.internship.findUnique({
    where: { id },
    include: {
      company: true,
      _count: {
        select: { applications: true },
      },
    },
  });
}

export async function getAllInternships(filters: any = {}) {
  const where: any = { status: 'active' };
  
  if (filters.location) {
    where.location = { contains: filters.location, mode: 'insensitive' };
  }
  
  if (filters.type) {
    where.type = filters.type;
  }
  
  if (filters.skills && filters.skills.length > 0) {
    where.skills = { hasSome: filters.skills };
  }

  return prisma.internship.findMany({
    where,
    orderBy: { posted: 'desc' },
    include: {
      company: {
        select: {
          name: true,
          logo: true,
          industry: true,
        },
      },
      _count: {
        select: { applications: true },
      },
    },
  });
}

// Application related functions
export async function applyForInternship(internshipId: string, studentId: string, data: any) {
  const application = await prisma.application.create({
    data: {
      internshipId,
      studentId,
      coverLetter: data.coverLetter,
      resumeUrl: data.resumeUrl,
    },
    include: {
      internship: {
        include: {
          company: true,
        },
      },
    },
  });

  // Create notification for company
  await prisma.notification.create({
    data: {
      applicationId: application.id,
      userId: application.internship.company.userId,
      title: 'New application received',
      message: `A new application has been submitted for ${application.internship.title}`,
    },
  });

  return application;
}

export async function getApplicationsByStudent(studentId: string) {
  return prisma.application.findMany({
    where: { studentId },
    include: {
      internship: {
        include: {
          company: {
            select: {
              name: true,
              logo: true,
            },
          },
        },
      },
    },
    orderBy: { submittedAt: 'desc' },
  });
}

export async function getApplicationsByInternship(internshipId: string) {
  return prisma.application.findMany({
    where: { internshipId },
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          university: true,
          profileImage: true,
        },
      },
    },
    orderBy: { submittedAt: 'desc' },
  });
}

export async function updateApplicationStatus(id: string, status: string) {
  const application = await prisma.application.update({
    where: { id },
    data: { status },
    include: {
      student: true,
      internship: true,
    },
  });

  // Create notification for student
  await prisma.notification.create({
    data: {
      applicationId: application.id,
      userId: application.student.userId,
      title: 'Application status updated',
      message: `Your application for ${application.internship.title} has been ${status}`,
    },
  });

  return application;
}

// Notification related functions
export async function getNotificationsByUser(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function markNotificationAsRead(id: string) {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function markAllNotificationsAsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
