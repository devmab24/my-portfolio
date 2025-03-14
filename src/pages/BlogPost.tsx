
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { BlogPost as BlogPostType } from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import CommentSection from '@/components/CommentSection';

// Sample blog posts data - in a real app, this would come from an API
const allPosts: BlogPostType[] = [
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

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPost = () => {
      setLoading(true);
      console.log("Looking for blog post with ID:", id);
      const foundPost = allPosts.find(post => post.id === id);
      
      if (foundPost) {
        console.log("Found post:", foundPost);
        setPost(foundPost);
      } else {
        console.error(`Post with id ${id} not found`);
      }
      
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Post Not Found</h1>
            <p className="text-muted-foreground">Sorry, we couldn't find the blog post you're looking for.</p>
            <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="mb-6"
              size="sm"
            >
              ← Back to Blog
            </Button>
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>By {post.author}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </div>
            
            {/* Cover Image Placeholder */}
            <div className="aspect-video bg-muted rounded-lg mb-8 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
            
            {/* Content */}
            <div className="prose max-w-none">
              <p className="lead text-lg mb-6">{post.excerpt}</p>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <h2>Key Takeaways</h2>
              
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
                <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco</li>
                <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
              </ul>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            
            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Comment Section */}
            <div className="mt-10">
              <CommentSection blogPostId={post.id} />
            </div>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
