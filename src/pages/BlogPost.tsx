
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { BlogPost as BlogPostType } from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import CommentSection from '@/components/CommentSection';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        console.log("Looking for blog post with ID:", id);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*, post_categories(name)')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching blog post:', error);
          throw error;
        }

        if (data) {
          console.log("Found post:", data);
          
          const formattedPost: BlogPostType = {
            id: data.id,
            title: data.title,
            excerpt: data.excerpt,
            date: new Date(data.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
            author: 'John Doe', // This would ideally come from a profiles table
            category: data.post_categories?.name || data.category || 'Uncategorized',
            tags: data.tags || [],
            readTime: `${Math.ceil(data.content.length / 1000)} min`,
            imageUrl: data.image_url,
            content: data.content, // Add content to BlogPostType for display
          };
          
          setPost(formattedPost);
        } else {
          console.error(`Post with id ${id} not found`);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Error',
          description: 'Failed to load blog post. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, toast]);

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
            
            {/* Cover Image */}
            {post.imageUrl ? (
              <div className="aspect-video bg-muted rounded-lg mb-8 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg mb-8 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
            )}
            
            {/* Content */}
            <div className="prose max-w-none">
              <p className="lead text-lg mb-6">{post.excerpt}</p>
              
              {/* Display actual content from the database */}
              <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
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
