
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clean up the database first
  await prisma.notification.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.internship.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Clean up complete. Creating seed data...');

  // Create users
  const companyUser = await prisma.user.create({
    data: {
      email: 'company@example.com',
      password: await hash('password123', 10),
      role: 'company',
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      email: 'student@example.com',
      password: await hash('password123', 10),
      role: 'student',
    },
  });

  // Create company
  const company = await prisma.company.create({
    data: {
      userId: companyUser.id,
      name: 'TechCorp Solutions',
      logo: 'https://via.placeholder.com/100',
      industry: 'Information Technology',
      location: 'Tunis, Tunisia',
      website: 'www.techcorp.tn',
      email: 'contact@techcorp.tn',
      phone: '+216 71 123 456',
      description: 'TechCorp Solutions is a leading IT company specializing in software development, cloud solutions, and digital transformation services.'
    },
  });

  // Create student
  const student = await prisma.student.create({
    data: {
      userId: studentUser.id,
      firstName: 'John',
      lastName: 'Doe',
      university: 'University of Tunis',
      major: 'Computer Science',
      graduationYear: 2024,
      skills: ['JavaScript', 'React', 'Node.js', 'SQL'],
      bio: 'A passionate computer science student with interests in web development and AI.'
    },
  });

  // Create internships
  const internship1 = await prisma.internship.create({
    data: {
      companyId: company.id,
      title: 'Frontend Developer Intern',
      location: 'Tunis, Tunisia',
      type: 'Full-time',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-09-30'),
      salary: '500 TND/month',
      description: 'Join our team and work on cutting-edge web applications using React and Next.js.',
      responsibilities: [
        'Develop responsive user interfaces',
        'Implement UI components using React',
        'Collaborate with the design team',
        'Optimize application performance'
      ],
      requirements: [
        'Currently pursuing a degree in Computer Science or related field',
        'Knowledge of HTML, CSS, and JavaScript',
        'Familiarity with React is a plus',
        'Good problem-solving skills'
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      applicationDeadline: new Date('2023-06-15'),
      positions: 2,
      status: 'active',
    },
  });

  const internship2 = await prisma.internship.create({
    data: {
      companyId: company.id,
      title: 'Backend Developer Intern',
      location: 'Remote',
      type: 'Part-time',
      startDate: new Date('2023-07-15'),
      endDate: new Date('2023-10-15'),
      salary: '400 TND/month',
      description: 'Work on our backend systems using Node.js and PostgreSQL.',
      responsibilities: [
        'Develop RESTful APIs',
        'Implement database models',
        'Write unit tests',
        'Document code and APIs'
      ],
      requirements: [
        'Currently pursuing a degree in Computer Science or related field',
        'Knowledge of JavaScript or TypeScript',
        'Familiarity with Node.js is a plus',
        'Understanding of databases and SQL'
      ],
      skills: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
      applicationDeadline: new Date('2023-06-30'),
      positions: 1,
      status: 'active',
    },
  });

  // Create an application
  const application = await prisma.application.create({
    data: {
      internshipId: internship1.id,
      studentId: student.id,
      status: 'pending',
      coverLetter: 'I am very interested in this position and believe my skills align well with your requirements...',
      resumeUrl: 'https://example.com/resume.pdf',
    },
  });

  // Create a notification
  await prisma.notification.create({
    data: {
      applicationId: application.id,
      userId: companyUser.id,
      title: 'New application received',
      message: `A new application has been submitted for ${internship1.title}`,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
