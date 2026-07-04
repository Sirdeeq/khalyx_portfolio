require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Hero = require('./src/models/Hero');
const About = require('./src/models/About');
const Project = require('./src/models/Project');
const Gallery = require('./src/models/Gallery');
const TechStack = require('./src/models/TechStack');
const Service = require('./src/models/Service');
const Media = require('./src/models/Media');
const Healthcare = require('./src/models/Healthcare');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    /* Clear existing data */
    await Promise.all([
      User.deleteMany({}),
      Hero.deleteMany({}),
      About.deleteMany({}),
      Project.deleteMany({}),
      Gallery.deleteMany({}),
      TechStack.deleteMany({}),
      Service.deleteMany({}),
      Media.deleteMany({}),
      Healthcare.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    /* Admin user */
    const user = await User.create({
      name: 'Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'superadmin',
    });
    console.log(`Admin user created: ${user.email}`);

    /* Hero */
    await Hero.create({
      roles: ['Full Stack Developer', 'UI/UX Designer', 'Motion Graphics Designer', 'Content Creator', 'Healthcare Advocate'],
      tagline: 'I build modern web and mobile applications, create engaging visual content, and leverage technology to solve real-world challenges in education, healthcare, and digital businesses.',
      portrait: 'https://ui-avatars.com/api/?name=Sadiq+Baba+Idris&background=BBCCD7&color=0C0C0C&size=256',
    });
    console.log('Hero seeded');

    /* About */
    await About.create({
      bio: "I'm Sadiq Baba Idris (Khalifa / Sirdurx), a Full Stack Developer, UI/UX Designer, Motion Graphics Designer and Creative Technologist from Kano, Nigeria. I specialize in building scalable web applications, mobile apps, healthcare systems, fintech platforms, educational technology and immersive digital experiences.",
      passion: "I'm passionate about solving problems with technology, creating engaging visual content, and building products that improve lives. I'm interested in AI, startups, fintech, healthcare and education.",
      values: ['Innovation', 'Simplicity', 'Community Impact', 'Learning', 'Leadership'],
    });
    console.log('About seeded');

    /* Projects */
    const projects = [
      { num: '01', name: 'Paylob', category: 'Fintech', features: 'Secure payments \u2022 Wallet \u2022 Transactions \u2022 Dashboard \u2022 Payment API', role: 'Founder & Lead Developer', url: '', col1_img1: '', col1_img2: '', col2_img: '', order: 0 },
      { num: '02', name: 'AKY Media Center', category: 'Media & Governance', features: '20 audio tracks \u2022 Live broadcast \u2022 Video streaming \u2022 News portal \u2022 Newsletter \u2022 Social media hub', role: 'Lead Developer - Techlife Global Ventures LTD', url: 'https://akywebsite-henna.vercel.app', col1_img1: '', col1_img2: '', col2_img: '', order: 1 },
      { num: '03', name: 'Elite Edu Tech', category: 'EdTech', features: 'Student dashboard \u2022 Teacher dashboard \u2022 Online learning \u2022 Educational content', role: 'Frontend Developer', url: '', col1_img1: '', col1_img2: '', col2_img: '', order: 2 },
      { num: '04', name: 'GAMSAJ International Ltd', category: 'Construction & Engineering', features: 'Building construction \u2022 Civil engineering \u2022 Real estate \u2022 Project management \u2022 Industrial construction', role: 'Lead Developer', url: 'https://gamsaj.com', col1_img1: '', col1_img2: '', col2_img: '', order: 3 },
    ];
    await Project.create(projects);
    console.log(`Projects seeded: ${projects.length}`);

    /* Gallery */
    const galleryItems = [
      { src: '', label: 'Behind-the-scenes', aspect: 'aspect-[3/4]', order: 0 },
      { src: '', label: 'Event coverage', aspect: 'aspect-[4/3]', order: 1 },
      { src: '', label: 'Professional portrait', aspect: 'aspect-[3/4]', order: 2 },
      { src: '', label: 'Design work', aspect: 'aspect-[4/5]', order: 3 },
      { src: '', label: 'Coding sessions', aspect: 'aspect-[3/4]', order: 4 },
      { src: '', label: 'Team / Event', aspect: 'aspect-[4/3]', order: 5 },
      { src: '', label: 'Professional', aspect: 'aspect-[3/4]', order: 6 },
      { src: '', label: 'Design showcase', aspect: 'aspect-[4/5]', order: 7 },
      { src: '', label: 'Coding / Workspace', aspect: 'aspect-[3/4]', order: 8 },
    ];
    await Gallery.create(galleryItems);
    console.log(`Gallery seeded: ${galleryItems.length}`);

    /* Tech Stack */
    const techStackCategories = [
      { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'React Native', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Reactstrap'], order: 0 },
      { category: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'PHP', 'REST APIs'], order: 1 },
      { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'], order: 2 },
      { category: 'ORM', items: ['Sequelize', 'Mongoose'], order: 3 },
      { category: 'DevOps', items: ['Vercel', 'Netlify', 'AWS EC2', 'AWS S3', 'Docker', 'Git', 'GitHub', 'CI/CD'], order: 4 },
      { category: 'Other', items: ['REST API', 'JWT Authentication', 'Responsive Design', 'Redux', 'OOP', 'AI Integration'], order: 5 },
    ];
    await TechStack.create(techStackCategories);
    console.log(`Tech stack seeded: ${techStackCategories.length} categories`);

    /* Services */
    const services = [
      { name: 'Web Development', description: 'Modern websites, business websites, landing pages, portfolio websites, dashboard systems, and full-stack web applications built with React, Next.js, Node.js and modern technologies.', icon: '', order: 0 },
      { name: 'Mobile App Development', description: 'Android, iOS, and React Native applications including healthcare apps, educational apps, and cross-platform mobile solutions.', icon: '', order: 1 },
      { name: 'UI/UX Design', description: 'Wireframes, prototypes, modern interfaces, and user experiences that are intuitive, accessible, and visually compelling.', icon: '', order: 2 },
      { name: 'API Development', description: 'REST APIs with authentication, payment integration, database design, and scalable backend architecture.', icon: '', order: 3 },
      { name: 'Motion Graphics', description: 'Logo animations, explainer videos, YouTube intros, product videos, and social media animations that bring brands to life.', icon: '', order: 4 },
      { name: 'Video Editing', description: 'TikTok, Instagram, YouTube content, commercial videos, wedding videos, corporate editing and documentary projects.', icon: '', order: 5 },
      { name: 'Graphic Design', description: 'Social media graphics, flyers, brand identity, posters, presentations and visual communication materials.', icon: '', order: 6 },
      { name: 'AI Solutions', description: 'AI integration, intelligent automation, and machine learning solutions for modern applications and business processes.', icon: '', order: 7 },
    ];
    await Service.create(services);
    console.log(`Services seeded: ${services.length}`);

    /* Media */
    await Media.create({
      title: 'Media Portfolio',
      timeline: [
        { title: 'Graphic Design', period: 'Where it all began', detail: 'I started my career as a freelance Graphic Designer, creating flyers, social media graphics, brand identities, logos, and marketing materials for individuals, small businesses, and organizations. This experience helped me develop a strong eye for design, branding, and visual communication.' },
        { title: 'Photography', period: 'Expanding the vision', detail: 'As my passion for creativity grew, I expanded into Photography, capturing portraits, events, products, and lifestyle content. Photography taught me how to tell compelling stories through composition, lighting, and attention to detail.' },
        { title: 'Multimedia Production', period: 'Full creative spectrum', detail: 'My creative journey later led me into multimedia production, where I developed skills in video editing, motion graphics, content creation, and digital storytelling. These experiences enabled me to produce engaging visual content across multiple platforms.' },
      ],
      services: ['Graphic Design', 'Brand Identity Design', 'Social Media Content Design', 'Photography', 'Portrait Photography', 'Event Photography', 'Product Photography', 'Videography', 'Video Editing', 'Motion Graphics', 'Promotional Videos', 'Short-form Content (TikTok, Instagram Reels, YouTube Shorts)', 'Content Strategy', 'Creative Direction', 'Digital Marketing Visuals', 'UI/UX Design'],
    });
    console.log('Media seeded');

    /* Healthcare */
    const healthcareItems = [
      {
        title: 'Chairman \u2013 Voice of Adolescents (VOA)',
        period: 'Present',
        brief: 'Youth-led organization supporting adolescents living with HIV, promoting health awareness',
        responsibilities: [
          'Lead and coordinate organizational activities and strategic planning',
          'Organize support meetings, outreach programs, and awareness campaigns',
          'Mentor adolescents and encourage treatment adherence and personal development',
          'Promote transparency, accountability, and effective leadership',
          'Collaborate with healthcare partners and community stakeholders',
        ],
        highlight: 'Designed and developed a custom digital management application for VOA to manage members, activities, attendance, reports, follow-ups, and organizational records \u2014 replacing manual processes and improving transparency.',
        order: 0,
      },
      {
        title: 'Peer Navigator \u2013 iCare+',
        period: '',
        brief: 'Direct support for adolescents and people living with HIV throughout their treatment journey',
        responsibilities: [
          'Support clients with treatment adherence and clinic appointments',
          'Conduct follow-up and patient tracking',
          'Provide peer counseling and emotional support',
          'Encourage viral load testing and continuous engagement in care',
          'Assist healthcare providers with patient documentation and monitoring',
          'Build trust between healthcare facilities and community members',
        ],
        order: 1,
      },
      {
        title: 'iCare Youth Advisory Board (YAB) Member',
        period: '',
        brief: 'Representing youth perspectives to improve healthcare services',
        responsibilities: [
          'Represent the voices of adolescents in program discussions',
          'Participate in planning meetings and program discussions',
          'Provide recommendations to improve youth-centered healthcare services',
          'Support awareness initiatives and youth engagement activities',
        ],
        order: 2,
      },
      {
        title: 'APYIN \u2013 Community Health Initiatives',
        period: '',
        brief: 'Improving access to healthcare services for adolescents and communities',
        responsibilities: [
          'Community engagement and mobilization',
          'Health education and awareness campaigns',
          'Support adolescent-focused interventions',
          'Collaborate with healthcare teams during outreach activities',
        ],
        order: 3,
      },
      {
        title: 'Gioponi \u2013 Community Health Programs',
        period: '',
        brief: 'Community-based health awareness and healthy lifestyle initiatives',
        responsibilities: [
          'Collaborate on community-based health programs',
          'Contribute to awareness campaigns',
          'Encourage healthy lifestyles and community participation',
          'Improve access to health information',
        ],
        order: 4,
      },
      {
        title: 'HIV & TB Awareness Volunteer',
        period: '',
        brief: 'Dedicated to reducing stigma and improving health outcomes through education',
        responsibilities: [
          'Community awareness campaigns',
          'Youth education sessions',
          'HIV and TB prevention advocacy',
          'Encourage early testing and treatment',
          'Promote treatment adherence',
          'Support community health outreach events',
        ],
        order: 5,
      },
      {
        title: 'Technology for Social Impact',
        period: '',
        brief: 'Applying technology to solve healthcare challenges for underserved communities',
        responsibilities: [
          'Develop digital solutions for patient management and community engagement',
          'Build activity tracking and organizational transparency tools',
          'Create data collection and reporting systems',
          'Improve healthcare accessibility through technology',
        ],
        highlight: 'I believe technology can make healthcare systems more efficient, transparent, and impactful \u2014 especially for adolescents and underserved communities.',
        order: 6,
      },
    ];
    await Healthcare.create(healthcareItems);
    console.log(`Healthcare seeded: ${healthcareItems.length} items`);

    await mongoose.disconnect();
    console.log('Seed complete. Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();
