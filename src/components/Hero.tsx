
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden">
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
              Software Developer & Designer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Crafting <span className="animated-gradient-text">digital experiences</span> with precision
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-xl">
            I build elegant, responsive, and high-performance applications with meticulous attention to detail and a commitment to excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium transition-all hover:brightness-110 active:translate-y-0.5"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium transition-all hover:bg-secondary/80 active:translate-y-0.5"
            >
              Contact Me
            </Link>
          </div>
        </AnimatedSection>

        {/* Hero Image/Visual */}
        <AnimatedSection delay={300} animation="fade-in">
          <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl -z-10"></div>
            <div className="glass-card rounded-2xl border border-border/40 shadow-xl overflow-hidden p-1 bg-zinc-900">
              <div className="bg-muted rounded-xl h-full w-full flex items-center justify-center aspect-square bg-zinc-800">
{/*                 <span className="text-5xl">👨‍💻</span> */}
                <img
                  src="/self_bg.png"
                  alt="My Photo"
                  className="rounded-xl object-cover w-full h-full"
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
