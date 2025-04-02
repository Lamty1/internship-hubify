
// Mock implementation for browser environments
// This file will be used in place of prisma.ts when running in the browser

// Create a mock PrismaClient with all the necessary methods
export const prisma = {
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    updateMany: async () => ({ count: 0 }),
    delete: async () => ({}),
    deleteMany: async () => ({ count: 0 }),
  },
  student: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    delete: async () => ({}),
  },
  company: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    delete: async () => ({}),
  },
  internship: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    delete: async () => ({}),
  },
  application: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => ({
      id: 'mock-application-id',
      ...data.data,
      internship: {
        title: 'Mock Internship',
        company: {
          userId: 'mock-user-id',
          name: 'Mock Company'
        }
      },
      student: {
        userId: 'mock-user-id',
        firstName: 'Mock',
        lastName: 'Student'
      }
    }),
    update: async (data: any) => ({
      id: 'mock-application-id',
      ...data.data,
      student: {
        userId: 'mock-user-id',
      },
      internship: {
        title: 'Mock Internship'
      }
    }),
    delete: async () => ({}),
  },
  notification: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    updateMany: async () => ({ count: 0 }),
    delete: async () => ({}),
  },
};

export default prisma;
