import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import BlogCard from '@/components/BlogCard';
import { publishedPosts } from '@/content/posts';

const allCategories = Array.from(new Set(publishedPosts.map((post) => post.category))).sort();

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase();
  const filteredPosts = publishedPosts.filter(
    (post) =>
      (!selectedCategory || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))),
  );

  const categoryButtonClass = (active: boolean) =>
    `px-3 py-1 text-sm rounded-full transition-colors ${
      active
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }`;

  return (
    <>
      <Seo
        title="Blog"
        description="Articles on software development, data science, and machine learning."
        path="/blog"
        noindex={publishedPosts.length === 0}
      />
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

              {publishedPosts.length === 0 ? (
                <AnimatedSection delay={200} className="text-center py-12 space-y-4">
                  <p className="text-muted-foreground">No articles yet. Check back soon.</p>
                  <Link to="/projects" className="text-primary hover:underline">
                    See my projects instead
                  </Link>
                </AnimatedSection>
              ) : (
                <>
                  <AnimatedSection delay={200} className="mb-8 space-y-6">
                    <div className="max-w-md mx-auto">
                      <input
                        type="text"
                        placeholder="Search articles..."
                        aria-label="Search articles"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={categoryButtonClass(selectedCategory === null)}
                      >
                        All
                      </button>
                      {allCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={categoryButtonClass(selectedCategory === category)}
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
                            key={post.slug}
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
                </>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
