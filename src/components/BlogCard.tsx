import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { type Post, formatDate, readTime } from '@/content/posts';

interface BlogCardProps {
  post: Post;
  className?: string;
  featured?: boolean;
}

const BlogCard = ({ post, className, featured = false }: BlogCardProps) => {
  return (
    <article
      className={cn(
        'group rounded-xl overflow-hidden border border-border/40 hover-card-animation bg-card',
        featured ? 'md:col-span-2' : '',
        className,
      )}
    >
      <Link to={`/blog/${post.slug}`} className="block h-full">
        <div className="flex flex-col h-full">
          <div className="relative h-48 overflow-hidden">
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                width={384}
                height={192}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-muted">
                <span className="text-4xl" aria-hidden="true">
                  📝
                </span>
              </div>
            )}
          </div>

          <div className="p-4 space-y-3 flex-grow flex flex-col">
            <div className="flex justify-between items-center text-xs">
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-medium group-hover:text-primary transition-colors">{post.title}</h3>

            <p className="text-muted-foreground text-sm flex-grow line-clamp-2">{post.excerpt}</p>

            <div className="pt-2 text-xs text-muted-foreground text-right">{readTime(post)} read</div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
