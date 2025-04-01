
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create student user
    const studentPassword = await hash('student123', 10);
    const studentUser = await prisma.user.create({
      data: {
        email: 'student@example.com',
        password: studentPassword,
        role: 'student',
        student: {
          create: {
            firstName: 'Ahmed',
            lastName: 'Ben Ali',
            university: 'University of Tunis',
            major: 'Computer Science',
            graduationYear: 2024,
            bio: 'Computer Science student passionate about web development and AI.',
            skills: ['JavaScript', 'React', 'Node.js', 'Python'],
          },
        },
      },
    });

    console.log('Created student user:', studentUser.email);

    // Create company users
    const companyPassword = await hash('company123', 10);
    const techCompany = await prisma.user.create({
      data: {
        email: 'tech@example.com',
        password: companyPassword,
        role: 'company',
        company: {
          create: {
            name: 'TechCorp Tunisia',
            industry: 'Information Technology',
            location: 'Tunis, Tunisia',
            website: 'https://techcorp.tn',
            email: 'careers@techcorp.tn',
            phone: '+216 71 000 000',
            description: 'Leading technology company in Tunisia specializing in software development and IT services.',
            logo: '/placeholder.svg',
          },
        },
      },
    });

    console.log('Created company user:', techCompany.email);

    const financeCompany = await prisma.user.create({
      data: {
        email: 'finance@example.com',
        password: companyPassword,
        role: 'company',
        company: {
          create: {
            name: 'FinancePro Tunis',
            industry: 'Finance',
            location: 'Tunis, Tunisia',
            website: 'https://financepro.tn',
            email: 'hr@financepro.tn',
            phone: '+216 71 111 111',
            description: 'Leading financial services provider in Tunisia.',
            logo: '/placeholder.svg',
          },
        },
      },
    });

    console.log('Created company user:', financeCompany.email);

    // Get company IDs
    const techCompanyData = await prisma.company.findFirst({
      where: { name: 'TechCorp Tunisia' },
    });

    const financeCompanyData = await prisma.company.findFirst({
      where: { name: 'FinancePro Tunis' },
    });

    if (techCompanyData && financeCompanyData) {
      // Create internships for TechCorp
      const now = new Date();
      const threeDaysAgo = new Date(now);
      threeDaysAgo.setDate(now.getDate() - 3);
      
      const sixMonthsLater = new Date(now);
      sixMonthsLater.setMonth(now.getMonth() + 6);
      
      const oneMonthLater = new Date(now);
      oneMonthLater.setMonth(now.getMonth() + 1);

      const softwareInternship = await prisma.internship.create({
        data: {
          companyId: techCompanyData.id,
          title: 'Software Engineering Intern',
          location: 'Tunis, Tunisia',
          type: 'Full-time',
          startDate: oneMonthLater,
          endDate: sixMonthsLater,
          salary: '800 TND/month',
          description: 'Join our software engineering team to develop cutting-edge applications.',
          responsibilities: [
            'Develop web applications using React and Node.js',
            'Collaborate with the team on software design and architecture',
            'Write clean, maintainable code',
            'Participate in code reviews',
          ],
          requirements: [
            'Currently pursuing a degree in Computer Science or related field',
            'Knowledge of JavaScript, HTML, and CSS',
            'Familiarity with React is a plus',
            'Good problem-solving skills',
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'Git'],
          applicationDeadline: oneMonthLater,
          positions: 2,
          status: 'active',
          posted: threeDaysAgo,
        },
      });

      console.log('Created internship:', softwareInternship.title);

      const uiUxInternship = await prisma.internship.create({
        data: {
          companyId: techCompanyData.id,
          title: 'UI/UX Design Intern',
          location: 'Remote',
          type: 'Part-time',
          startDate: oneMonthLater,
          endDate: sixMonthsLater,
          salary: '600 TND/month',
          description: 'Work with our design team to create beautiful and intuitive user interfaces.',
          responsibilities: [
            'Design user interfaces for web and mobile applications',
            'Create wireframes and prototypes',
            'Conduct user research and usability testing',
            'Collaborate with developers to implement designs',
          ],
          requirements: [
            'Currently pursuing a degree in Design, HCI, or related field',
            'Proficiency in design tools like Figma or Adobe XD',
            'Understanding of UI/UX principles',
            'Good communication skills',
          ],
          skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'],
          applicationDeadline: oneMonthLater,
          positions: 1,
          status: 'active',
          posted: threeDaysAgo,
        },
      });

      console.log('Created internship:', uiUxInternship.title);

      // Create internships for FinancePro
      const financeInternship = await prisma.internship.create({
        data: {
          companyId: financeCompanyData.id,
          title: 'Financial Analyst Intern',
          location: 'Tunis, Tunisia',
          type: 'Full-time',
          startDate: oneMonthLater,
          endDate: sixMonthsLater,
          salary: '900 TND/month',
          description: 'Join our finance team to analyze market trends and financial data.',
          responsibilities: [
            'Analyze financial data and market trends',
            'Prepare financial reports and presentations',
            'Assist in financial planning and budgeting',
            'Support the team in financial decision-making',
          ],
          requirements: [
            'Currently pursuing a degree in Finance, Economics, or related field',
            'Strong analytical skills',
            'Proficiency in Excel',
            'Attention to detail',
          ],
          skills: ['Financial Analysis', 'Excel', 'Data Visualization', 'Research'],
          applicationDeadline: oneMonthLater,
          positions: 2,
          status: 'active',
          posted: threeDaysAgo,
        },
      });

      console.log('Created internship:', financeInternship.title);

      // Create applications
      const studentData = await prisma.student.findFirst({
        where: { firstName: 'Ahmed' },
      });

      if (studentData) {
        const application1 = await prisma.application.create({
          data: {
            internshipId: softwareInternship.id,
            studentId: studentData.id,
            status: 'pending',
            coverLetter: 'I am excited to apply for this internship opportunity...',
            resumeUrl: '/placeholder-resume.pdf',
          },
        });

        console.log('Created application for:', softwareInternship.title);

        // Create notifications
        await prisma.notification.create({
          data: {
            applicationId: application1.id,
            userId: techCompanyData.userId,
            title: 'New application received',
            message: `Ahmed Ben Ali applied for Software Engineering Intern position`,
          },
        });

        console.log('Created notification for company');
      }
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
