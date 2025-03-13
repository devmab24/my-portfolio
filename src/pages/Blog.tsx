
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import BlogCard, { BlogPost } from '@/components/BlogCard';

// Sample blog posts data
const allPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Building Scalable React Applications',
    excerpt: 'Learn how to structure and build React applications that scale well as your project grows.',
    date: 'Mar 15, 2023',
    author: 'John Doe',
    category: 'React',
    tags: ['React', 'Architecture', 'JavaScript'],
    readTime: '5 min',
  },
  {
    id: 'post-2',
    title: 'The Future of Web Development',
    excerpt: 'Exploring emerging technologies and trends that will shape the future of web development.',
    date: 'Feb 28, 2023',
    author: 'John Doe',
    category: 'Web',
    tags: ['Future', 'Trends', 'Technology'],
    readTime: '7 min',
  },
  {
    id: 'post-3',
    title: 'Optimizing Database Performance',
    excerpt: 'Tips and techniques for improving the performance of your database queries and structure.',
    date: 'Feb 15, 2023',
    author: 'John Doe',
    category: 'Database',
    tags: ['MongoDB', 'PostgreSQL', 'Performance'],
    readTime: '6 min',
  },
  {
    id: 'post-4',
    title: 'Getting Started with TypeScript',
    excerpt: 'A beginner-friendly guide to using TypeScript in your JavaScript projects.',
    date: 'Jan 22, 2023',
    author: 'John Doe',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Beginner'],
    readTime: '8 min',
  },
  {
    id: 'post-5',
    title: 'Serverless Architecture Explained',
    excerpt: 'Understanding the benefits and challenges of serverless architecture for modern applications.',
    date: 'Jan 10, 2023',
    author: 'John Doe',
    category: 'Architecture',
    tags: ['Serverless', 'AWS', 'Azure'],
    readTime: '6 min',
  },
  {
    id: 'post-6',
    title: 'Mastering CSS Grid Layout',
    excerpt: 'Deep dive into CSS Grid Layout and how to use it to create complex web layouts with ease.',
    date: 'Dec 28, 2022',
    author: 'John Doe',
    category: 'CSS',
    tags: ['CSS', 'Layout', 'Design'],
    readTime: '5 min',
  },
];

// Extract unique categories for filter
const allCategories = Array.from(
  new Set(allPosts.map(post => post.category))
).sort();

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on selected category and search query
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <section className="section-spacing">
          <div className="container-custom">
            <AnimatedSection className="space-y-4 mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Thoughts, insights, and tutorials on software development and design.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={200} className="mb-8 space-y-6">
              {/* Search Input */}
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              
              {/* Filter Categories */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === null
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  All
                </button>
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, index) => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      featured={index === 0 && !selectedCategory && !searchQuery}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles match your search criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
