
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@/types/comment";
import { formatDistanceToNow } from "date-fns";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  // Get initials from author name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex gap-4 py-4">
      <Avatar>
        <AvatarImage src={comment.avatar} alt={comment.author} />
        <AvatarFallback>{getInitials(comment.author)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium">{comment.author}</h4>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-sm">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
