import type { Project } from '@/types/project';

/**
 * Single source of truth for projects. Edit this file and push to publish.
 *
 * Rules:
 * - Only real links. Leave demoUrl / githubUrl / downloadUrl out rather than
 *   using placeholders; the buttons hide automatically.
 * - Only real details. Sections without data (timeline, role, challenges,
 *   keyFeatures) are hidden, never filled with invented text.
 * - `draft: true` keeps an entry off the site until it's complete.
 */
const allProjects: Project[] = [
  // ── Published ─────────────────────────────────────────────────────────────
  {
    slug: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    description:
      'A modern e-commerce platform built with React, Node.js, and MongoDB with full payment integration.',
    imageSrc: '/project-images/E-commerce_platform.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    projectType: 'web',
    demoUrl: 'https://checkoutly.vercel.app',
    featured: true,
  },
  {
    slug: 'ai-image-generator',
    title: 'AI Image Generator',
    description: "An application that generates images using OpenAI's DALL-E model.",
    imageSrc: '/project-images/ai-imageGenerator.webp',
    tags: ['Next.js', 'OpenAI API', 'Vercel'],
    projectType: 'web',
    demoUrl: 'https://imaginate-ai-phi.vercel.app',
    featured: true,
  },
  {
    slug: 'task-management-app',
    title: 'Task Management App',
    description:
      'A productivity application for managing tasks and projects with collaborative features.',
    imageSrc: '/project-images/tasks_management.png',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    projectType: 'web',
    featured: true,
  },
  {
    slug: 'personal-finance-dashboard',
    title: 'Personal Finance Dashboard',
    description: 'A dashboard for tracking personal finances, investments, and budget planning.',
    tags: ['React', 'D3.js', 'Firebase'],
    projectType: 'web',
  },
  {
    slug: 'recipe-sharing-platform',
    title: 'Recipe Sharing Platform',
    description:
      'A platform for food enthusiasts to share and discover recipes from around the world.',
    imageSrc: '/project-images/recipe-sharing-app.jpeg',
    tags: ['Vue.js', 'Express', 'PostgreSQL'],
    projectType: 'web',
  },
  {
    slug: 'real-time-chat-application',
    title: 'Real-time Chat Application',
    description:
      'A real-time chat application with features like message reactions, threads, and file sharing.',
    imageSrc: '/project-images/real-time_chat_app.png',
    tags: ['React', 'Socket.io', 'Express'],
    projectType: 'web',
  },
  {
    slug: 'image-resizer',
    title: 'Image Resizer',
    description:
      'A Python script that automatically resizes and optimizes images in bulk. Perfect for preparing images for web use or social media.',
    tags: ['Python', 'Image Processing', 'Automation'],
    projectType: 'python',
    // TODO: add the script to public/downloads/image_resizer.py, then:
    // downloadUrl: '/downloads/image_resizer.py',
  },

  // ── Drafts: images exist in public/project-images, details are missing ──────
  // TODO(owner): fill in title/description/tags/links, then remove `draft: true`.
  {
    slug: 'caredocs',
    title: 'CareDocs',
    description: 'TODO',
    imageSrc: '/project-images/caredocs.png',
    tags: [],
    projectType: 'web',
    draft: true,
  },
  {
    slug: 'emotion-detector',
    title: 'Emotion Detector',
    description: 'TODO',
    imageSrc: '/project-images/emotion_detector.jpg',
    tags: [],
    projectType: 'datascience',
    draft: true,
  },
  {
    slug: 'house-price-prediction',
    title: 'House Price Prediction',
    description: 'TODO',
    imageSrc: '/project-images/house-price-prediction.jpeg',
    tags: [],
    projectType: 'datascience',
    draft: true,
  },
  {
    slug: 'password-checker',
    title: 'Password Checker',
    description: 'TODO',
    imageSrc: '/project-images/password_checker.webp',
    tags: [],
    projectType: 'python',
    draft: true,
  },
  {
    slug: 'web-scraper',
    title: 'Web Scraper',
    description: 'TODO',
    imageSrc: '/project-images/web_scrapper.png',
    tags: [],
    projectType: 'python',
    draft: true,
  },
  {
    slug: 'peer-to-peer',
    title: 'Peer-to-Peer',
    description: 'TODO',
    imageSrc: '/project-images/peer-to-peer.png',
    tags: [],
    projectType: 'web',
    draft: true,
  },
  {
    slug: 'acme',
    title: 'Acme',
    description: 'TODO',
    imageSrc: '/project-images/acme.png',
    tags: [],
    projectType: 'web',
    draft: true,
  },
  {
    slug: 'b-gen',
    title: 'b_gen',
    description: 'TODO',
    imageSrc: '/project-images/b_gen.png',
    tags: [],
    projectType: 'web',
    draft: true,
  },
  {
    slug: 'portfolio',
    title: 'Portfolio Website',
    description: 'TODO',
    imageSrc: '/project-images/portfolio.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    projectType: 'web',
    githubUrl: 'https://github.com/devmab24/my-portfolio',
    demoUrl: 'https://devmab.vercel.app',
    draft: true,
  },
];

export const projects: Project[] = allProjects.filter((p) => !p.draft);

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export const getProject = (slug: string | undefined): Project | undefined =>
  projects.find((p) => p.slug === slug);
