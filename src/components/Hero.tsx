
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import { highPriority } from '@/lib/img';

const Hero = () => {
  return (
    // pt-28/md:pt-32 clears the fixed navbar so the hero never starts underneath it.
    <section className="min-h-[90vh] flex items-center relative overflow-hidden pt-28 pb-16 md:pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute left-1/4 bottom-1/4 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Hero Content */}
        <AnimatedSection className="space-y-6" animation="fade-in-right">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              AI ENGINEER · MACHINE LEARNING · COMPUTER VISION
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Building <span className="animated-gradient-text">Intelligent Systems</span>. Engineering Real-World Solutions.
            </h1>
          </div>

          <p className="text-lg text-muted-foreground max-w-xl">
            Hi, I'm <strong className="text-foreground">Muhammad Ayuba Bello</strong>. I am an AI Engineer with a Computer
            Science background and software engineering experience. I focus on developing machine learning models, deep
            learning systems, and computer vision applications—and engineering software that makes these capabilities
            useful in real-world settings.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 pt-4">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium transition-all hover:brightness-110 active:translate-y-0.5"
            >
              Explore My Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="/Muhammad_Ayuba_Bello_CV.pdf"
              download
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium transition-all hover:bg-secondary/80 active:translate-y-0.5"
            >
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium transition-all hover:bg-secondary/80 active:translate-y-0.5"
            >
              Get in Touch
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">Open to AI Engineering and Machine Learning opportunities</p>
        </AnimatedSection>

        {/* Hero Image/Visual */}
        {/* Phones (below md): photo above the text, at a smaller size. Tablet/desktop: unchanged. */}
        <AnimatedSection delay={300} animation="fade-in" className="max-md:order-first">
          <div className="relative aspect-square max-w-md mx-auto lg:max-w-none max-md:max-w-[18rem]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl -z-10"></div>
            <div className="glass-card rounded-2xl border border-border/40 shadow-xl overflow-hidden p-1 ">
              <div className="bg-muted rounded-xl h-full w-full flex items-center justify-center aspect-square">
                <img
                  src="/headshot.webp"
                  alt="Muhammad Ayuba Bello"
                  width={600}
                  height={800}
                  {...highPriority}
                  className="rounded-xl object-cover w-md h-md"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
