
export interface Comment {
  id: string;
  blogPostId: string;
  author: string;
  content: string;
  createdAt: string;
  avatar?: string;
  author_id?: string; // Add this for compatibility with Supabase
}
