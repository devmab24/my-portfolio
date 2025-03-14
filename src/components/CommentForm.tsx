
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

interface CommentFormProps {
  blogPostId: string;
  onSubmitSuccess: () => void;
}

const CommentForm = ({ blogPostId, onSubmitSuccess }: CommentFormProps) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) {
      toast({
        title: "Required fields",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to save the comment
      // For now, we'll simulate adding a comment to localStorage
      const newComment = {
        id: crypto.randomUUID(),
        blogPostId,
        author,
        content,
        createdAt: new Date().toISOString(),
      };
      
      // Get existing comments from localStorage
      const existingCommentsStr = localStorage.getItem("blog-comments") || "[]";
      const existingComments = JSON.parse(existingCommentsStr);
      
      // Add new comment
      const updatedComments = [...existingComments, newComment];
      
      // Save back to localStorage
      localStorage.setItem("blog-comments", JSON.stringify(updatedComments));
      
      // Reset form
      setAuthor("");
      setContent("");
      
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      });
      
      onSubmitSuccess();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add your comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this post..."
          className="min-h-[120px]"
          required
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        <MessageSquare className="mr-2 h-4 w-4" />
        {isSubmitting ? "Submitting..." : "Post Comment"}
      </Button>
    </form>
  );
};

export default CommentForm;
