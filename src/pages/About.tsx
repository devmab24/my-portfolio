import { Download, BookOpen, Briefcase, Award, ChevronRight, BarChart3, Brain, Code2, Wrench, Users, Presentation } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import Seo from '@/components/Seo';

// Content source: docs/portfolio_content_update.md, plus details confirmed by the owner.

const ABOUT_PARAGRAPHS = [
  'I am a Computer Science graduate and AI/ML practitioner interested in building intelligent systems that address practical problems.',
  'My technical experience spans machine learning, deep learning, and computer vision. I have worked on projects involving predictive modelling, image classification, object detection, and image segmentation—covering stages such as data preparation, model development, training, evaluation, and performance analysis.',
  'My software engineering background gives me a broader perspective on AI development. Beyond training models, I am interested in building the APIs, backend services, and applications that make intelligent capabilities accessible and useful.',
  'I also contribute to technical education and community development through teaching, facilitation, mentorship, and collaborative learning initiatives.',
  'I am particularly interested in applying AI to challenges in education, healthcare, infrastructure, and other sectors where technology can create measurable value.',
];

interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  points?: string[];
  result?: string;
}

const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'AI/ML Instructor',
    organization: '3Logy · Sponsored by Seplat Energy and NCDMB',
    period: 'January 2026 – October 2026',
    description:
      'Facilitated technical learning in artificial intelligence, machine learning, and data science through instruction and hands-on learning activities.',
    points: [
      'Introduced learners to AI/ML concepts, tools, and practical applications.',
      'Facilitated hands-on sessions and project-based learning.',
      'Explained programming, data science, and machine learning fundamentals.',
      'Supported technical mentorship and collaborative learning.',
    ],
  },
  {
    title: 'Assistant Instructor, Digital Tools Orientation',
    organization: '3Logy · Sponsored by Seplat Energy and NCDMB',
    period: 'October 2025 – December 2025',
    description: 'Supported the delivery of a Digital Tools Orientation training programme.',
  },
  {
    title: 'Machine Learning Intern',
    organization: 'Codveda Technologies · Remote',
    period: 'September – October 2025',
    description:
      'Completed practical machine learning internship tasks involving data preparation, model development, and evaluation.',
    points: [
      'Developed a breast cancer classification model using Logistic Regression.',
      'Evaluated model performance using accuracy, F1 score, and ROC-AUC.',
      'Implemented a feedforward neural network using TensorFlow/Keras for handwritten digit recognition with the MNIST dataset.',
      'Applied machine learning and deep learning concepts to practical modelling tasks.',
    ],
    result:
      'Breast cancer classification model: 98.2% accuracy, 98.6% F1 score, and 0.995 ROC-AUC on the project dataset.',
  },
  {
    title: 'Assistant Lecturer (NYSC)',
    organization: 'Taraba State Polytechnic, Jalingo',
    period: 'February 2023 – January 2024',
    description: 'Contributed to computer science education, supporting students across National Diploma levels.',
    points: [
      'Supported the teaching of computer science concepts to ND1 and ND2 students.',
      'Helped learners develop foundational programming, technical, and problem-solving skills.',
      'Supported practical learning and the explanation of computing concepts.',
    ],
  },
  // Earlier software roles (kept at the owner's request).
  {
    title: 'Software Engineer',
    organization: 'Munademy',
    period: '2024 - Present',
    description:
      'Providing Software Solutions for businesses. Implementing CI/CD pipelines.',
  },
  {
    title: 'Full-Stack Developer',
    organization: 'Self-taught',
    period: '2023 - 2024',
    description:
      'Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with UX designers to implement responsive designs and improve user experience.',
  },
  {
    title: 'Frontend Developer',
    organization: 'CodeWithJamil.org',
    period: '2022 - 2023',
    description:
      'Built responsive websites for clients using HTML, CSS, and JavaScript. Assisted in maintaining client websites and implementing new features based on client feedback.',
  },
];

interface CardItem {
  icon: LucideIcon;
  title: string;
  organization?: string;
  period?: string;
  description: string;
  points?: string[];
}

const COMMUNITY: CardItem[] = [
  {
    icon: Users,
    title: 'Alumni Ambassador',
    organization: 'WorldQuant University',
    description:
      'Contribute to the WorldQuant University alumni community through engagement, knowledge sharing, and professional development initiatives.',
  },
  {
    icon: Users,
    title: 'Founder',
    organization: 'WQU Skills Hub',
    description:
      'Founded WQU Skills Hub, a learning community with more than 100 members interested in developing practical technical skills.',
    points: [
      'Encourage collaborative learning and knowledge sharing.',
      'Facilitate discussions around AI/ML, data science, and career development.',
      'Support peer learning, mentorship, and technical growth.',
    ],
  },
  {
    icon: Presentation,
    title: 'Technical Instruction & Facilitation',
    organization: 'Training and community initiatives',
    description:
      'Contribute to technical education through AI/ML, data science, and digital-skills training initiatives, including facilitation and hands-on learning.',
  },
];

const EDUCATION_AND_CERTIFICATIONS: CardItem[] = [
  {
    icon: BookOpen,
    title: 'Bachelor of Technology in Computer Science',
    organization: 'Modibbo Adama University of Technology (MAUTECH), Yola',
    period: '2017 - 2023',
    description:
      'Academic foundation in computer science, programming, software development, and computational problem-solving.',
  },
  {
    icon: Award,
    title: 'Applied Data Science Lab',
    organization: 'WorldQuant University',
    description: 'Practical learning in applied data science through structured exercises and project-based work.',
  },
  {
    icon: Award,
    title: 'Machine Learning Internship',
    organization: 'Codveda Technologies',
    period: 'September – October 2025',
    description:
      'Practical machine learning experience involving classification, neural networks, and model evaluation.',
  },
  {
    icon: Award,
    title: 'Applied Software Engineering',
    organization: 'Coursera.org',
    period: '2022',
    description:
      'Training sponsored by NITDA. Validated ability to design and implement distributed systems, including deploying applications, data storage, and securing infrastructure. Certified in facilitating and understanding the application of agile methodologies in software development.',
  },
  {
    icon: Award,
    title: 'Certified JavaScript Developer',
    organization: 'OpenJS Foundation',
    period: '2019',
    description:
      'Demonstrated proficiency in JavaScript programming, including ES6+ features, asynchronous programming, and modern frameworks.',
  },
];

const SKILL_GROUPS: { icon: LucideIcon; title: string; skills: string[] }[] = [
  {
    icon: BarChart3,
    title: 'Machine Learning & Data Science',
    skills: [
      'Supervised learning',
      'Classification and predictive modelling',
      'Data preprocessing and exploratory data analysis',
      'Feature engineering',
      'Model training and evaluation',
      'Performance metrics and error analysis',
      'Scikit-learn, Pandas, and NumPy',
    ],
  },
  {
    icon: Brain,
    title: 'Deep Learning & Computer Vision',
    skills: [
      'Artificial neural networks',
      'Convolutional neural networks (CNNs)',
      'Image classification',
      'Object detection',
      'Semantic segmentation',
      'YOLO architectures',
      'U-Net architecture',
      'TensorFlow and Keras',
      'OpenCV',
    ],
  },
  {
    icon: Code2,
    title: 'Software Engineering',
    skills: ['Python', 'JavaScript', 'FastAPI', 'REST API development', 'React', 'Next.js', 'PostgreSQL', 'SQL', 'Git and GitHub'],
  },
  {
    icon: Wrench,
    title: 'Development & Experimentation Tools',
    skills: ['Jupyter Notebook', 'Google Colab', 'Git and GitHub', 'Visual Studio Code'],
  },
];

const InfoCard = ({ item }: { item: CardItem }) => {
  const Icon = item.icon;
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border/40 hover-card-animation">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          {item.organization && <p className="text-muted-foreground">{item.organization}</p>}
          {item.period && <p className="text-sm text-muted-foreground mt-1">{item.period}</p>}
          <p className="text-muted-foreground mt-4">{item.description}</p>
          {item.points && (
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground list-disc list-inside">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <>
      <Seo
        title="About"
        description="About Muhammad Ayuba Bello, an AI Engineer working across machine learning, computer vision, and software engineering: experience, community work, education, and technical expertise."
        path="/about"
      />
      <div className="flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-grow pt-24">
          {/* Hero Section */}
          <section className="pb-12 pt-4">
            <div className="container-custom">
              <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    About Me
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Engineering Software. <span className="animated-gradient-text">Building Intelligence.</span> Solving Problems.
                  </h1>
                  {ABOUT_PARAGRAPHS.map((paragraph) => (
                    <p key={paragraph} className="text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}

                  <div className="pt-4">
                    <a
                      href="/Muhammad_Ayuba_Bello_CV.pdf" download
                      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium transition-all hover:brightness-110 active:translate-y-0.5"
                    >
                      Download CV
                      <Download className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Phones (below md): photo above the text, at a smaller size, as on the homepage hero. */}
                <div className="relative max-md:order-first max-md:w-full max-md:max-w-[18rem] max-md:mx-auto">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl -z-10"></div>
                  <div className="glass-card rounded-2xl border border-border/40 shadow-xl overflow-hidden p-1">
                    <div className="bg-muted rounded-xl h-full w-full flex items-center justify-center aspect-square">
                      <img
                        src="/headshot.webp"
                        alt="Muhammad Ayuba Bello"
                        width={600}
                        height={800}
                        className="rounded-xl object-cover w-md h-md"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Experience Section */}
          <section className="section-spacing bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="space-y-2 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Professional Experience</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A timeline of my professional journey and career milestones.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border before:bg-gradient-to-b before:from-transparent before:to-transparent before:via-muted-foreground before:z-0">
                  {EXPERIENCE.map((item) => (
                    <div
                      key={`${item.title}-${item.organization}`}
                      className="relative z-10 flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Briefcase className="h-5 w-5" />
                      </div>

                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-lg shadow-sm border border-border/40 hover-card-animation">
                        <div className="flex flex-col space-y-1 mb-2">
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <span className="text-muted-foreground">{item.organization}</span>
                          <span className="text-sm text-muted-foreground">{item.period}</span>
                        </div>

                        <p className="text-muted-foreground">{item.description}</p>
                        {item.points && (
                          <ul className="mt-3 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                            {item.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        )}
                        {item.result && <p className="mt-3 text-sm text-muted-foreground">{item.result}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Community & Leadership Section */}
          <section className="section-spacing">
            <div className="container-custom">
              <AnimatedSection className="space-y-2 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Community & Leadership</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  I believe technical growth is strengthened by knowledge sharing, mentorship, and communities that make
                  learning accessible.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {COMMUNITY.map((item) => (
                    <InfoCard key={`${item.title}-${item.organization}`} item={item} />
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Education Section */}
          <section className="section-spacing bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="space-y-2 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Education & Certifications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My academic background, certifications, and professional development.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {EDUCATION_AND_CERTIFICATIONS.map((item) => (
                    <InfoCard key={`${item.title}-${item.organization}`} item={item} />
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Skills Section */}
          <section className="section-spacing">
            <div className="container-custom">
              <AnimatedSection className="space-y-2 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Technical Expertise</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My work combines machine learning, computer vision, and software engineering, from model development
                  and evaluation to building application interfaces and backend services.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SKILL_GROUPS.map(({ icon: Icon, title, skills }) => (
                    <div key={title} className="p-4 rounded-lg bg-card border border-border/40 space-y-2 hover-card-animation">
                      <h3 className="font-medium flex items-center">
                        <Icon className="h-4 w-4 mr-2" />
                        {title}
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {skills.map((skill) => (
                          <li key={skill} className="flex items-center">
                            <ChevronRight className="h-3 w-3 mr-1 shrink-0" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
