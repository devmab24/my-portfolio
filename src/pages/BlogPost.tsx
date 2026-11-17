import { Link, useParams } from 'react-router-dom';
import Seo from '@/components/Seo';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { formatDate, getPost, readTime } from '@/content/posts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Seo title="Article not found" path={`/blog/${slug ?? ''}`} noindex />
        <NavBar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container max-w-3xl mx-auto px-4 text-center py-24">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog" className="text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.imageUrl}
        type="article"
      />
      <NavBar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readTime(post)} read</span>
                </div>
              </div>
            </header>

            {post.imageUrl && (
              <div className="aspect-video bg-muted rounded-lg mb-8 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <article className="prose dark:prose-invert max-w-none">
              <p className="lead text-lg">{post.excerpt}</p>
              <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
            </article>

            {post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
