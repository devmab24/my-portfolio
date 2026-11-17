
import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import BlogCard, { BlogPost } from '@/components/BlogCard';
import { supabase } from '@/hooks/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*, post_categories(name)')
          .eq('published', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching blog posts:', error);
          throw error;
        }


        // Transform data to match BlogPost interface
        const transformedPosts: BlogPost[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          date: new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          author: 'John Doe', // This would ideally come from a profiles table
          category: item.post_categories?.name || item.category || 'Uncategorized',
          tags: item.tags || [],
          readTime: `${Math.ceil(item.content.length / 1000)} min`,
          imageUrl: item.image_url,
        }));

        setPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load blog posts. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [toast]);

  // Extract unique categories for filter
  const allCategories = Array.from(
    new Set(posts.map(post => post.category))
  ).sort();

  // Filter posts based on selected category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>devmab | Blog</title>
        <meta name="description" content="Blog page" />
      </Helmet>
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
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : filteredPosts.length > 0 ? (
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
    </>
  );
};

export default Blog;
