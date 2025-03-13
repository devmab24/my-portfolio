
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-right';
  threshold?: number;
  once?: boolean;
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  animation = 'fade-in',
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;
    
    if (!current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '20px',
      }
    );
    
    observer.observe(current);
    
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-700',
        {
          'opacity-0': !isVisible,
          'opacity-100': isVisible,
          [`animate-${animation}`]: isVisible,
        },
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
        animationPlayState: isVisible ? 'running' : 'paused',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
