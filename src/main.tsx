import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove data the old localStorage "mock backend" left in returning visitors' browsers.
// Safe to delete this block a few months after the static-content release.
try {
  for (const key of [
    'admin_users', 'blog_posts', 'comments', 'contact_submissions', 'post_categories',
    'profiles', 'projects', 'user_growth', 'web_traffic', 'sb-session', 'isAdmin',
  ]) {
    localStorage.removeItem(key);
  }
} catch {
  // Storage unavailable (private mode, blocked cookies): nothing to clean.
}

createRoot(document.getElementById("root")!).render(<App />);
