import { Download, BookOpen, Briefcase, Award, ChevronRight, BarChart3, Brain } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>devmab | About</title>
        <meta name="description" content="About page" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        
        <main className="flex-grow pt-24">
          {/* Hero Section */}
          <section className="pb-12 pt-4">
            <div className="container-custom">
              <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Full-Stack Developer & Data Scientist
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Passionate about creating <span className="animated-gradient-text">meaningful experiences</span>
                  </h1>
                  <p className="text-muted-foreground">
                    I'm a software developer and data scientist with a passion for creating elegant solutions to complex problems. With expertise in full-stack development, machine learning, and data analytics, I build applications that are not only functional but also intelligent, user-friendly, and visually appealing.
                  </p>
                  
                  <div className="pt-4">
                    <a 
                      href="#" 
                      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium transition-all hover:brightness-110 active:translate-y-0.5"
                    >
                      Download Resume
                      <Download className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl -z-10"></div>
                  <div className="glass-card rounded-2xl border border-border/40 shadow-xl overflow-hidden p-1">
                    <div className="bg-muted rounded-xl h-full w-full flex items-center justify-center aspect-square">
                      {/*<span className="text-6xl">👨‍💻</span> */}
                      <img
                        src="/photo_bg.png"
                        alt="My Photo"
                        className="rounded-xl object-cover w-full h-full"
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
                  {/* Experience Item 1 */}
                  <div className="relative z-10 flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-lg shadow-sm border border-border/40 hover-card-animation">
                      <div className="flex flex-col space-y-1 mb-2">
                        <h3 className="text-xl font-semibold">Software Engineer</h3>
                        <span className="text-muted-foreground">https://munademy.com/</span>
                        <span className="text-sm text-muted-foreground">2024 - Present</span>
                      </div>
                      
                      <p className="text-muted-foreground">
                        Providing Software Solutions for businesses. Implementing CI/CD pipelines and improving website performance by 40%.
                      </p>
                    </div>
                  </div>
                  
                  {/* Experience Item 2 */}
                  <div className="relative z-10 flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-lg shadow-sm border border-border/40 hover-card-animation">
                      <div className="flex flex-col space-y-1 mb-2">
                        <h3 className="text-xl font-semibold">Full-Stack Developer</h3>
                        <span className="text-muted-foreground">Self Thought</span>
                        <span className="text-sm text-muted-foreground">2023 - 2024</span>
                      </div>
                      
                      <p className="text-muted-foreground">
                        Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with UX designers to implement responsive designs and improve user experience.
                      </p>
                    </div>
                  </div>
                  
                  {/* Experience Item 3 */}
                  <div className="relative z-10 flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-lg shadow-sm border border-border/40 hover-card-animation">
                      <div className="flex flex-col space-y-1 mb-2">
                        <h3 className="text-xl font-semibold">Junior Web Developer</h3>
                        <span className="text-muted-foreground">CodeWithJamil.org</span>
                        <span className="text-sm text-muted-foreground">2021 - 2023</span>
                      </div>
                      
                      <p className="text-muted-foreground">
                        Built responsive websites for clients using HTML, CSS, and JavaScript. Assisted in maintaining client websites and implementing new features based on client feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
          
          {/* Education Section */}
          <section className="section-spacing">
            <div className="container-custom">
              <AnimatedSection className="space-y-2 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Education & Certifications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My academic background and professional certifications.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Certification Card */}
                  <div className="bg-card p-6 rounded-lg shadow-sm border border-border/40 hover-card-animation">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Applied Data Science and Machine Learning</h3>
                        <p className="text-muted-foreground">WorldQuant University</p>
                        <p className="text-sm text-muted-foreground mt-1">2025</p>
                        <p className="text-muted-foreground mt-4">
                          Completed a comprehensive program in Applied Data Science and Machine Learning, using tools like Jupyter, Pandas, Scikit-learn, Matplotlib, Numpy and many more.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education Card */}
                  <div className="bg-card p-6 rounded-lg shadow-sm border border-border/40 hover-card-animation">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Bachelor of Technology in Computer Science</h3>
                        <p className="text-muted-foreground">Modibbo Adama University of Technology, Yola</p>
                        <p className="text-sm text-muted-foreground mt-1">2017 - 2022</p>
                        <p className="text-muted-foreground mt-4">
                          Studied Computer Science where I mastered algorithms, data structures, software engineering principles, and web development fundamentals.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Certification Card */}
                  <div className="bg-card p-6 rounded-lg shadow-sm border border-border/40 hover-card-animation">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Appplied Software Engineering</h3>
                        <p className="text-muted-foreground">Coursera.org</p>
                        <p className="text-sm text-muted-foreground mt-1">^2022</p>
                        <p className="text-muted-foreground mt-4">
                          Nitda Career Ready Professional. I Validated ability to design and implement distributed systems, including deploying applications, data storage, and securing infrastructure.
                          Certified in facilitating and understanding the application of agile methodologies in software development.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Certification Card */}
                  <div className="bg-card p-6 rounded-lg shadow-sm border border-border/40 hover-card-animation">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Certified JavaScript Developer</h3>
                        <p className="text-muted-foreground">OpenJS Foundation</p>
                        <p className="text-sm text-muted-foreground mt-1">2019</p>
                        <p className="text-muted-foreground mt-4">
                          Demonstrated proficiency in JavaScript programming, including ES6+ features, asynchronous programming, and modern frameworks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
          
          {/* Skills Section */}
          <section className="section-spacing bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>
                  <p className="text-muted-foreground">
                    With expertise in both frontend and backend technologies, plus data science and machine learning, I bring a comprehensive skill set to every project.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Skill Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">JavaScript/TypeScript</span>
                        <span className="text-muted-foreground">95%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    
                    {/* Skill Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Python & Data Science</span>
                        <span className="text-muted-foreground">92%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    {/* Skill Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">React & React Native</span>
                        <span className="text-muted-foreground">90%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    
                    {/* Skill Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Machine Learning & AI</span>
                        <span className="text-muted-foreground">88%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    
                    {/* Skill Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Node.js & Express</span>
                        <span className="text-muted-foreground">85%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    {/* Skill Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Database Management</span>
                        <span className="text-muted-foreground">80%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">Tools & Technologies</h2>
                  <p className="text-muted-foreground">
                    I stay up-to-date with the latest tools and technologies to deliver modern solutions across web development and data science.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-card border border-border/40 space-y-2 hover-card-animation">
                      <h3 className="font-medium">Frontend</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          React, Vue.js
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Next.js, Flask, FastAPI
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Tailwind CSS, SASS
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          TypeScript, Redux
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-card border border-border/40 space-y-2 hover-card-animation">
                      <h3 className="font-medium">Backend</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Node.js, Express
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Python, Django
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          GraphQL, REST APIs
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Serverless Functions
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-card border border-border/40 space-y-2 hover-card-animation">
                      <h3 className="font-medium flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Data Science
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Pandas, NumPy
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Matplotlib, Seaborn
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Jupyter, Google Colab
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          SQL, Apache Spark
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-card border border-border/40 space-y-2 hover-card-animation">
                      <h3 className="font-medium flex items-center">
                        <Brain className="h-4 w-4 mr-2" />
                        Machine Learning
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Scikit-learn, TensorFlow
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          PyTorch, Keras
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          OpenCV, NLTK
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          MLflow, Hugging Face
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-card border border-border/40 space-y-2 hover-card-animation">
                      <h3 className="font-medium">Database</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          MongoDB, PostgreSQL
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Firebase, Supabase
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Redis, MySQL
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          ORM Libraries
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-card border border-border/40 space-y-2 hover-card-animation">
                      <h3 className="font-medium">DevOps</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Git, GitHub Actions
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Docker, Kubernetes
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          AWS, Vercel, Netlify
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          CI/CD Pipelines
                        </li>
                      </ul>
                    </div>
                  </div>
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
