
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/hooks/supabase/client";

interface CommentFormProps {
  blogPostId: string;
  onSubmitSuccess: () => void;
}

const CommentForm = ({ blogPostId, onSubmitSuccess }: CommentFormProps) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        
        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileData) {
          setAuthor(profileData.username);
        }
      }
    };
    
    checkUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Required fields",
        description: "Please enter a comment",
        variant: "destructive"
      });
      return;
    }
    
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add a comment",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add comment to Supabase
      const { error } = await supabase
        .from('comments')
        .insert({
          blog_post_id: blogPostId,
          author_id: user.id,
          content
        });
      
      if (error) throw error;
      
      // Reset form
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

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL || "https://devmab.vercel.app"
      }
    })
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!user ? (
        <div className="text-center py-4">
          <p className="text-muted-foreground mb-2">Please log in to comment</p>
          <Button type="button" onClick={handleLogin} className="w-full sm:w-auto">
            Log in with GitHub
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Posting as:</span>
            <span className="text-sm">{author || user.email}</span>
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
        </>
      )}
    </form>
  );
};

export default CommentForm;
