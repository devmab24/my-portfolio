
import { useEffect, useState } from "react";
import { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";
import { useToast } from "@/hooks/use-toast";

interface CommentListProps {
  blogPostId: string;
  refreshTrigger: number;
}

const CommentList = ({ blogPostId, refreshTrigger }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchComments = () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call to get comments
        // For now, we'll use localStorage
        const allCommentsStr = localStorage.getItem("blog-comments") || "[]";
        const allComments: Comment[] = JSON.parse(allCommentsStr);
        
        // Filter comments for this blog post
        const postComments = allComments.filter(
          (comment) => comment.blogPostId === blogPostId
        );
        
        // Sort by date, newest first
        postComments.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setComments(postComments);
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
