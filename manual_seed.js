const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Cleaning up database...');
    await prisma.blog.deleteMany({});
    await prisma.package.deleteMany({});
    await prisma.destination.deleteMany({});

    console.log('Seeding destinations...');
    await prisma.destination.createMany({
      data: [
        { name: 'المالديف', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop', programsCount: 12, description: 'جنة المحيط الهندي.' },
        { name: 'تركيا', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop', programsCount: 25, description: 'ملتقى القارات.' },
        { name: 'إيطاليا', image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=1200&auto=format&fit=crop', programsCount: 18, description: 'بلد الفن والجمال.' },
        { name: 'دبي', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop', programsCount: 20, description: 'عاصمة المستقبل.' },
      ]
    });

    console.log('Seeding blog...');
    await prisma.blog.createMany({
      data: [
        { 
          title: 'أسرار السفر إلى المالديف', 
          content: 'دليل شامل لاختيار الجزيرة المثالية في المالديف.', 
          image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
          author: 'مستشار الميراج'
        }
      ]
    });

    console.log('Seeding packages...');
    await prisma.package.createMany({
      data: [
        {
          title: 'باقة المالديف الملكية',
          description: 'إقامة فاخرة لمدة 6 أيام.',
          image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1200&auto=format&fit=crop',
          price: 15500,
          duration: '6 أيام',
          location: 'المالديف',
          category: 'packages',
          isFeatured: true
        }
      ]
    });

    console.log('Seed successful!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
