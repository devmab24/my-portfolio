
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
}

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

const BlogCard = ({ post, className, featured = false }: BlogCardProps) => {
  return (
    <article 
      className={cn(
        "group rounded-xl overflow-hidden border border-border/40 hover-card-animation bg-card",
        featured ? "md:col-span-2" : "",
        className
      )}
    >
      <Link to={`/blog/${post.id}`} className="block h-full">
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <div className="h-full flex items-center justify-center bg-muted">
              <span className="text-4xl">📝</span>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-4 space-y-3 flex-grow flex flex-col">
            {/* Category and Date */}
            <div className="flex justify-between items-center text-xs">
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {post.category}
              </span>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-medium group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-muted-foreground text-sm flex-grow line-clamp-2">
              {post.excerpt}
            </p>
            
            {/* Author and Read Time */}
            <div className="flex justify-between items-center pt-2 text-xs text-muted-foreground">
              <span>By {post.author}</span>
              <span>{post.readTime} read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
