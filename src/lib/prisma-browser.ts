
// Mock implementation for browser environments
// This file will be used in place of prisma.ts when running in the browser

// Create a mock PrismaClient with all the necessary methods
export const prisma = {
  user: {
    findUnique: async (params: any = {}) => null,
    findMany: async (params: any = {}) => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    updateMany: async (params: any = {}) => ({ count: 0 }),
    delete: async (params: any = {}) => ({}),
    deleteMany: async (params: any = {}) => ({ count: 0 }),
  },
  student: {
    findUnique: async (params: any = {}) => null,
    findMany: async (params: any = {}) => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    delete: async (params: any = {}) => ({}),
  },
  company: {
    findUnique: async (params: any = {}) => null,
    findMany: async (params: any = {}) => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    delete: async (params: any = {}) => ({}),
  },
  internship: {
    findUnique: async (params: any = {}) => null,
    findMany: async (params: any = {}) => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    delete: async (params: any = {}) => ({}),
  },
  application: {
    findUnique: async (params: any = {}) => null,
    findMany: async (params: any = {}) => [],
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
    delete: async (params: any = {}) => ({}),
  },
  notification: {
    findUnique: async (params: any = {}) => null,
    findMany: async (params: any = {}) => [],
    create: async (data: any) => data.data,
    update: async (data: any) => data.data,
    updateMany: async (params: any = {}) => ({ count: 0 }),
    delete: async (params: any = {}) => ({}),
  },
};

export default prisma;
