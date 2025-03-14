
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentSectionProps {
  blogPostId: string;
}

const CommentSection = ({ blogPostId }: CommentSectionProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentAdded = () => {
    // Increment the refresh trigger to cause CommentList to re-fetch
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <CommentList 
            blogPostId={blogPostId} 
            refreshTrigger={refreshTrigger}
          />
          
          <div className="pt-4 border-t border-border">
            <h3 className="font-medium mb-4">Leave a comment</h3>
            <CommentForm 
              blogPostId={blogPostId} 
              onSubmitSuccess={handleCommentAdded} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentSection;
