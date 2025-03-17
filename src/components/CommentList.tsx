
import { useEffect, useState } from "react";
import { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/hooks/supabase/client";

interface CommentListProps {
  blogPostId: string;
  refreshTrigger: number;
}

const CommentList = ({ blogPostId, refreshTrigger }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      
      try {
        // Fetch comments from Supabase
        const { data, error } = await supabase
          .from('comments')
          .select(`
            id,
            content,
            created_at,
            author_id,
            profiles(username, avatar_url)
          `)
          .eq('blog_post_id', blogPostId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Transform the data to match our Comment interface
        const transformedComments: Comment[] = data.map((comment: any) => ({
          id: comment.id,
          blogPostId,
          author: comment.profiles?.username || null,
          content: comment.content,
          createdAt: comment.created_at,
          avatar: comment.profiles?.avatar_url,
          author_id: comment.author_id
        }));
        
        setComments(transformedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast({
          title: "Error",
          description: "Failed to load comments",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
    
    // Set up real-time subscription for comments
    const channel = supabase
      .channel('public:comments')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'comments',
        filter: `blog_post_id=eq.${blogPostId}`
      }, () => {
        // Refresh comments when changes occur
        fetchComments();
      })
      .subscribe();
    
    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [blogPostId, refreshTrigger, toast]);

  if (isLoading) {
    return <div className="py-4 text-center text-muted-foreground">Loading comments...</div>;
  }

  if (comments.length === 0) {
    return (
      <div className="py-6 text-center text-muted-foreground">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="space-y-1 divide-y divide-border">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
