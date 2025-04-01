
// Mock implementation for browser environments
// This file will be used in place of prisma.ts when running in the browser

const mockPrisma = {
  user: createMockModel(),
  student: createMockModel(),
  company: createMockModel(),
  internship: createMockModel(),
  application: createMockModel(),
  notification: createMockModel(),
};

function createMockModel() {
  return {
    findUnique: () => Promise.resolve(null),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    updateMany: () => Promise.resolve({ count: 0 }),
    delete: () => Promise.resolve({}),
    deleteMany: () => Promise.resolve({ count: 0 }),
  };
}

export default mockPrisma;
export const prisma = mockPrisma;
