// This file implements a local-first mock Supabase client using localStorage.
// It is seeded with the recovered historical database records.

import type { Database } from './types';

const SEEDS: Record<string, any[]> = {
  "admin_users": [
    {
      "id": "8505a952-cf2f-4746-8627-963629cffbcb",
      "username": "admin",
      "password_hash": "password",
      "created_at": "2025-03-17 17:09:00.500498+00",
      "updated_at": "2025-03-17 17:09:00.500498+00"
    }
  ],
  "blog_posts": [
    {
      "id": "468acbe4-8ea9-4ca2-b765-bb29bf96e79b",
      "title": "Building Scalable React Applications",
      "excerpt": "Learn how to architect large-scale React applications that can grow with your business needs.",
      "content": "<p>React has become the go-to library for building modern user interfaces. But as your application grows, you need to think about architecture...</p><p>In this article, we will explore patterns and practices that help you maintain a clean and scalable codebase even as your application grows in complexity.</p><h2>Component Organization</h2><p>One of the first challenges in a growing React application is organizing your components. There are several approaches:</p><ul><li>By feature/domain</li><li>By component type (containers/presentational)</li><li>By route</li></ul><p>Each approach has its merits, but organizing by feature often scales best for larger applications.</p>",
      "author_id": null,
      "category": "React",
      "tags": [
        "react",
        "architecture",
        "frontend"
      ],
      "image_url": "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "created_at": "2025-03-15 10:40:04.587519+00",
      "updated_at": "2025-03-15 10:40:04.587519+00",
      "published": true,
      "category_id": "885843d6-f264-47b3-8926-df66643312ef",
      "status": "published"
    },
    {
      "id": "2cb43730-1487-47f4-9e5b-3779e7ae0b14",
      "title": "The Future of Web Development",
      "excerpt": "Exploring upcoming technologies and methodologies that will shape how we build web applications.",
      "content": "<p>The web development landscape is constantly evolving. From new JavaScript frameworks to innovative approaches to styling, the pace of change is relentless.</p><p>In this article, we look at some of the most promising technologies and methodologies that are likely to gain widespread adoption in the coming years.</p><h2>Web Assembly</h2><p>WebAssembly (Wasm) allows code written in languages like C, C++, and Rust to run in the browser at near-native speed. This opens up possibilities for bringing desktop-quality applications to the web.</p><h2>Edge Computing</h2><p>Moving computation closer to where it's needed can dramatically improve performance for users around the world. Edge functions are becoming an essential part of modern web architecture.</p>",
      "author_id": null,
      "category": "JavaScript",
      "tags": [
        "webdev",
        "future",
        "javascript"
      ],
      "image_url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
      "created_at": "2025-03-15 10:40:04.587519+00",
      "updated_at": "2025-03-15 10:40:04.587519+00",
      "published": true,
      "category_id": "dd50bf53-9669-4cb0-a01b-9bc4b7fcb9ea",
      "status": "published"
    },
    {
      "id": "5a7d17b7-60c1-4074-92f9-bbe233d56e9f",
      "title": "Getting Started with TypeScript",
      "excerpt": "A beginner-friendly introduction to TypeScript and how it can improve your JavaScript projects.",
      "content": "<p>TypeScript has gained enormous popularity in recent years, and for good reason. It adds static typing to JavaScript, helping catch errors early and improving developer productivity.</p><p>In this guide, we'll walk through setting up TypeScript in a new project and cover the fundamental concepts you need to know.</p><h2>What is TypeScript?</h2><p>TypeScript is a superset of JavaScript that adds static type definitions. These types are checked at compile time, catching potential errors before your code even runs.</p><h2>Setting Up TypeScript</h2><p>Getting started with TypeScript is straightforward:</p><pre><code>npm install -g typescript\\\\ntsc --init</code></pre><p>This creates a tsconfig.json file that controls how TypeScript compiles your code.</p>",
      "author_id": null,
      "category": "TypeScript",
      "tags": [
        "typescript",
        "javascript",
        "webdev"
      ],
      "image_url": "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "created_at": "2025-03-15 10:40:04.587519+00",
      "updated_at": "2025-03-15 10:40:04.587519+00",
      "published": true,
      "category_id": "b7f10cc6-e0ce-4393-8df7-99530cf23ad0",
      "status": "published"
    },
    {
      "id": "f87a44fb-e3c5-4ced-80ce-da611ac6a626",
      "title": "Optimizing Database Performance",
      "excerpt": "Learn essential techniques for improving database query performance in high-traffic applications.",
      "content": "<p>Database performance can make or break your application. As your user base grows, queries that once ran quickly can become bottlenecks.</p><p>In this comprehensive guide, we'll explore various strategies for optimizing database performance, from query tuning to indexing and beyond.</p><h2>Understanding Indexes</h2><p>Indexes are one of the most powerful tools for improving query performance. They work like the index of a book, allowing the database to quickly locate data without scanning every row.</p><p>However, indexes come with trade-offs. They speed up reads but can slow down writes, and they consume additional storage.</p><h2>Query Optimization</h2><p>Often, the way you write your queries can significantly impact performance. Consider this example of a query before and after optimization:</p><pre><code>-- Before optimization\\\\nSELECT * FROM users WHERE last_login > '2023-01-01';\\\\n\\\\n-- After optimization\\\\nSELECT id, username, email FROM users WHERE last_login > '2023-01-01';</code></pre>",
      "author_id": null,
      "category": "Node.js",
      "tags": [
        "database",
        "performance",
        "sql"
      ],
      "image_url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1356&q=80",
      "created_at": "2025-03-15 10:40:04.587519+00",
      "updated_at": "2025-03-15 10:40:04.587519+00",
      "published": true,
      "category_id": "9b821536-12d7-4daf-ac5c-5846116cd543",
      "status": "published"
    }
  ],
  "comments": [
    {
      "id": "384a1379-60df-4565-8783-1ad6be47ba88",
      "blog_post_id": "2cb43730-1487-47f4-9e5b-3779e7ae0b14",
      "author_id": "3b97d02d-a53b-4cd8-af61-2432172656c6",
      "content": "blablalalbla",
      "created_at": "2025-03-17 13:40:49.524056+00",
      "updated_at": "2025-03-17 13:40:49.524056+00"
    },
    {
      "id": "2ef186e9-6c75-4f0d-b94b-b6784b9d642a",
      "blog_post_id": "2cb43730-1487-47f4-9e5b-3779e7ae0b14",
      "author_id": "3b97d02d-a53b-4cd8-af61-2432172656c6",
      "content": "lorem testing ipsum",
      "created_at": "2025-03-17 14:03:10.353046+00",
      "updated_at": "2025-03-17 14:03:10.353046+00"
    },
    {
      "id": "86639c5b-8d7c-42ab-8ce3-d4e5da9fd5a3",
      "blog_post_id": "2cb43730-1487-47f4-9e5b-3779e7ae0b14",
      "author_id": "3b97d02d-a53b-4cd8-af61-2432172656c6",
      "content": "All the environment was amzaing",
      "created_at": "2025-03-17 14:03:44.349126+00",
      "updated_at": "2025-03-17 14:03:44.349126+00"
    }
  ],
  "post_categories": [
    {
      "id": "885843d6-f264-47b3-8926-df66643312ef",
      "name": "React",
      "post_count": 12,
      "created_at": "2025-03-15 10:24:05.096097+00",
      "updated_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "dd50bf53-9669-4cb0-a01b-9bc4b7fcb9ea",
      "name": "JavaScript",
      "post_count": 8,
      "created_at": "2025-03-15 10:24:05.096097+00",
      "updated_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "5681d81f-f840-4378-914f-3ed4ed1efa88",
      "name": "CSS",
      "post_count": 5,
      "created_at": "2025-03-15 10:24:05.096097+00",
      "updated_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "b7f10cc6-e0ce-4393-8df7-99530cf23ad0",
      "name": "TypeScript",
      "post_count": 7,
      "created_at": "2025-03-15 10:24:05.096097+00",
      "updated_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "9b821536-12d7-4daf-ac5c-5846116cd543",
      "name": "Node.js",
      "post_count": 4,
      "created_at": "2025-03-15 10:24:05.096097+00",
      "updated_at": "2025-03-15 10:24:05.096097+00"
    }
  ],
  "profiles": [
    {
      "id": "3b97d02d-a53b-4cd8-af61-2432172656c6",
      "username": "talk2muhammadbello@gmail.com",
      "avatar_url": "https://avatars.githubusercontent.com/u/60035968?v=4",
      "created_at": "2025-03-17 13:39:49.125193+00",
      "updated_at": "2025-03-17 13:39:49.125193+00"
    }
  ],
  "projects": [
    {
      "id": "2fb2de12-f2c3-43e9-bbec-854c890bacce",
      "title": "AI Image Generator",
      "description": "An application that generates images using OpenAI's DALL-E model.",
      "image_url": "ai-imageGenerator.webp",
      "tags": [
        "Next.js",
        "OpenAI API",
        "Vercel"
      ],
      "github_url": "https://github.com/devmab24",
      "demo_url": "https://example.com",
      "featured": false,
      "created_at": "2025-03-14 11:53:47.650769+00",
      "updated_at": "2025-03-14 11:53:47.650769+00",
      "project_type": "web",
      "download_url": null
    },
    {
      "id": "ac273726-3085-42da-9541-4cf5f6878c29",
      "title": "Task Management App",
      "description": "A productivity application for managing tasks and projects with collaborative features.",
      "image_url": "tasks_management.png",
      "tags": [
        "React",
        "Firebase",
        "Tailwind CSS"
      ],
      "github_url": "https://github.com",
      "demo_url": "https://example.com",
      "featured": false,
      "created_at": "2025-03-14 11:53:47.650769+00",
      "updated_at": "2025-03-14 11:53:47.650769+00",
      "project_type": "web",
      "download_url": null
    },
    {
      "id": "f6333fa4-b8fe-46fc-9bdc-c70faaa61994",
      "title": "E-Commerce Platform",
      "description": "A modern e-commerce platform built with React, Node.js, and MongoDB with full payment integration.",
      "image_url": "E-commerce_platform.png",
      "tags": [
        "React",
        "Node.js",
        "MongoDB",
        "Stripe"
      ],
      "github_url": "https://github.com",
      "demo_url": "https://example.com",
      "featured": true,
      "created_at": "2025-03-14 11:53:47.650769+00",
      "updated_at": "2025-03-14 11:53:47.650769+00",
      "project_type": "web",
      "download_url": null
    },
    {
      "id": "bf97ae9f-aef1-456d-a0d4-6f3022da3077",
      "title": "Personal Finance Dashboard",
      "description": "A dashboard for tracking personal finances, investments, and budget planning.",
      "image_url": "personal-finance-dashboard.jpg",
      "tags": [
        "React",
        "D3.js",
        "Firebase"
      ],
      "github_url": "https://github.com",
      "demo_url": null,
      "featured": false,
      "created_at": "2025-03-14 11:53:47.650769+00",
      "updated_at": "2025-03-14 11:53:47.650769+00",
      "project_type": "web",
      "download_url": null
    },
    {
      "id": "a89da592-9529-447b-9214-26beb4df444a",
      "title": "Recipe Sharing Platform",
      "description": "A platform for food enthusiasts to share and discover recipes from around the world.",
      "image_url": "recipe-sharing-app.jpeg",
      "tags": [
        "Vue.js",
        "Express",
        "PostgreSQL"
      ],
      "github_url": "https://github.com",
      "demo_url": "https://example.com",
      "featured": false,
      "created_at": "2025-03-14 11:53:47.650769+00",
      "updated_at": "2025-03-14 11:53:47.650769+00",
      "project_type": "web",
      "download_url": null
    },
    {
      "id": "d7854797-25a4-4b12-b588-12dd0f1b6d75",
      "title": "Real-time Chat Application",
      "description": "A real-time chat application with features like message reactions, threads, and file sharing.",
      "image_url": "real-time_chat_app.png",
      "tags": [
        "React",
        "Socket.io",
        "Express"
      ],
      "github_url": "https://github.com",
      "demo_url": null,
      "featured": false,
      "created_at": "2025-03-14 11:53:47.650769+00",
      "updated_at": "2025-03-14 11:53:47.650769+00",
      "project_type": "web",
      "download_url": null
    },
    {
      "id": "03184b66-c97e-4ac6-85de-52bf1f14633a",
      "title": "Image Resizer",
      "description": "A Python script that automatically resizes and optimizes images in bulk. Perfect for preparing images for web use or social media.",
      "image_url": "tasks_management.png",
      "tags": [
        "Python",
        "Image Processing",
        "Automation"
      ],
      "github_url": null,
      "demo_url": null,
      "featured": false,
      "created_at": "2025-04-26 22:42:40.445922+00",
      "updated_at": "2025-04-26 22:42:40.445922+00",
      "project_type": "python",
      "download_url": "https://lemachbekmdprrdtthem.supabase.co/storage/v1/object/public/python-scripts/image_resizer.py"
    }
  ],
  "user_growth": [
    {
      "id": "ead56f57-c15d-4cf7-bc4f-6993a8f7a2a4",
      "date": "2023-01-01",
      "new_users": 45,
      "total_users": 1045,
      "active_users": 680,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "652abc98-2e42-4d39-bb07-e8ee21a6570e",
      "date": "2023-02-01",
      "new_users": 65,
      "total_users": 1110,
      "active_users": 710,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "db54511b-a828-4ae8-9e85-110cbcb11b44",
      "date": "2023-03-01",
      "new_users": 52,
      "total_users": 1162,
      "active_users": 725,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "79e6ed3a-5226-454e-a11d-f5b98145f1d4",
      "date": "2023-04-01",
      "new_users": 78,
      "total_users": 1240,
      "active_users": 760,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "d45783e3-425e-4212-8903-719d45e95a39",
      "date": "2023-05-01",
      "new_users": 86,
      "total_users": 1326,
      "active_users": 810,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "eb47135c-9488-408a-b3f1-bf45e351dc36",
      "date": "2023-06-01",
      "new_users": 94,
      "total_users": 1420,
      "active_users": 860,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "6933721e-d8a1-4cc0-99b4-6a1eb8a64351",
      "date": "2023-07-01",
      "new_users": 110,
      "total_users": 1530,
      "active_users": 920,
      "created_at": "2025-03-15 10:24:05.096097+00"
    }
  ],
  "web_traffic": [
    {
      "id": "e8bad2e6-6155-4855-9179-865ea839bc40",
      "date": "2023-01-01",
      "page_views": 400,
      "unique_visitors": 280,
      "bounce_rate": 45.2,
      "avg_session_duration": 120,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "35068e34-0143-4e52-861e-320536a3491c",
      "date": "2023-02-01",
      "page_views": 320,
      "unique_visitors": 210,
      "bounce_rate": 48.7,
      "avg_session_duration": 115,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "d90478a3-11f6-426e-9340-caa825ea9c0c",
      "date": "2023-03-01",
      "page_views": 510,
      "unique_visitors": 350,
      "bounce_rate": 42.3,
      "avg_session_duration": 135,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "78b899e0-138f-45b7-a106-5e53d091437b",
      "date": "2023-04-01",
      "page_views": 480,
      "unique_visitors": 320,
      "bounce_rate": 44.1,
      "avg_session_duration": 125,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "456543aa-4921-4bb0-a6ef-0ddc261cc227",
      "date": "2023-05-01",
      "page_views": 650,
      "unique_visitors": 420,
      "bounce_rate": 40.8,
      "avg_session_duration": 145,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "1f181dcd-2314-465c-a4e5-55fa3934ee79",
      "date": "2023-06-01",
      "page_views": 720,
      "unique_visitors": 480,
      "bounce_rate": 38.5,
      "avg_session_duration": 160,
      "created_at": "2025-03-15 10:24:05.096097+00"
    },
    {
      "id": "eebe780a-ec07-406e-9f56-c73406fe6692",
      "date": "2023-07-01",
      "page_views": 790,
      "unique_visitors": 520,
      "bounce_rate": 37.2,
      "avg_session_duration": 170,
      "created_at": "2025-03-15 10:24:05.096097+00"
    }
  ]
};

// Initialize localStorage if not already done
export function initializeLocalStorage() {
  for (const [table, rows] of Object.entries(SEEDS)) {
    if (!localStorage.getItem(table)) {
      localStorage.setItem(table, JSON.stringify(rows));
    }
  }
}

// Run initialization immediately on load
if (typeof window !== 'undefined') {
  initializeLocalStorage();
}

// Event Hub for simulating Realtime changes
class MockChannel {
  private name: string;
  private listeners: Array<{
    event: string;
    filter: { schema: string; table: string; filter?: string; event?: string };
    callback: (payload: any) => void;
  }> = [];

  constructor(name: string) {
    this.name = name;
  }

  on(event: string, filter: any, callback: (payload: any) => void) {
    this.listeners.push({ event, filter, callback });
    return this;
  }

  subscribe() {
    activeChannels.add(this);
    return this;
  }

  trigger(event: string, table: string, record: any) {
    for (const listener of this.listeners) {
      if (listener.filter.table === table) {
        // Filter logic for comments blog_post_id
        if (listener.filter.filter) {
          const filterStr = listener.filter.filter;
          const match = filterStr.match(/blog_post_id=eq\.(.+)/);
          if (match) {
            const blogPostId = match[1];
            if (record.blog_post_id !== blogPostId) {
              continue;
            }
          }
        }
        listener.callback({
          new: record,
          old: event === 'DELETE' ? record : undefined,
          eventType: event,
          schema: 'public',
          table: table,
          commit_timestamp: new Date().toISOString(),
          errors: null
        });
      }
    }
  }
}

const activeChannels = new Set<MockChannel>();

function publishTableChange(table: string, event: string, record: any) {
  for (const channel of activeChannels) {
    channel.trigger(event, table, record);
  }
}

// Mock Postgrest Builder for chainable queries
class MockPostgrestBuilder {
  private tableName: string;
  private filters: Array<(item: any) => boolean> = [];
  private orderCol: string | null = null;
  private orderAsc: boolean = true;
  private limitCount: number | null = null;
  private isSingle: boolean = false;
  private selectCols: string = '*';

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(cols: string = '*') {
    this.selectCols = cols;
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push((item) => {
      const itemValue = item[column];
      // Loose equality/string representation to handle uuid/string comparisons
      if (itemValue === undefined) return false;
      return String(itemValue) === String(value);
    });
    return this;
  }

  order(column: string, { ascending = true } = {}) {
    this.orderCol = column;
    this.orderAsc = ascending;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  private getData() {
    let data = JSON.parse(localStorage.getItem(this.tableName) || '[]');
    
    // Apply filters
    for (const filter of this.filters) {
      data = data.filter(filter);
    }
    
    // Apply order
    if (this.orderCol) {
      data.sort((a: any, b: any) => {
        let valA = a[this.orderCol!];
        let valB = b[this.orderCol!];
        
        // Handle dates
        if (typeof valA === 'string' && Date.parse(valA)) {
          const timeA = new Date(valA).getTime();
          const timeB = new Date(valB).getTime();
          if (!isNaN(timeA) && !isNaN(timeB)) {
            valA = timeA;
            valB = timeB;
          }
        }

        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (valA < valB) return this.orderAsc ? -1 : 1;
        return this.orderAsc ? 1 : -1;
      });
    }
    
    // Apply limit
    if (this.limitCount !== null) {
      data = data.slice(0, this.limitCount);
    }

    // Parse and handle relational joins
    // Case 1: post_categories(name)
    if (this.selectCols.includes('post_categories(')) {
      const categories = JSON.parse(localStorage.getItem('post_categories') || '[]');
      data = data.map((item: any) => {
        const cat = categories.find((c: any) => String(c.id) === String(item.category_id));
        return {
          ...item,
          post_categories: cat ? { name: cat.name } : null
        };
      });
    }

    // Case 2: profiles(username, avatar_url)
    if (this.selectCols.includes('profiles(')) {
      const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
      data = data.map((item: any) => {
        const prof = profiles.find((p: any) => String(p.id) === String(item.author_id));
        return {
          ...item,
          profiles: prof ? { username: prof.username, avatar_url: prof.avatar_url } : null
        };
      });
    }

    return data;
  }

  // Allows builder to be awaited directly (Promise-like)
  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    try {
      const result = this.getData();
      const payload = this.isSingle ? (result[0] || null) : result;
      
      if (this.isSingle && !payload) {
        // Supabase returns an error for single() when no rows are found
        const res = { data: null, error: { message: "JSON object requested, multiple (or no) rows returned", code: "PGRST116" } };
        return Promise.resolve(res).then(onfulfilled, onrejected);
      }

      const res = { data: payload, error: null };
      return Promise.resolve(res).then(onfulfilled, onrejected);
    } catch (err: any) {
      return Promise.resolve({ data: null, error: err }).then(onfulfilled, onrejected);
    }
  }

  // INSERT mutation
  async insert(rows: any | any[]) {
    try {
      const rowArray = Array.isArray(rows) ? rows : [rows];
      const current = JSON.parse(localStorage.getItem(this.tableName) || '[]');
      
      const newRows = rowArray.map(r => ({
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...r
      }));

      const updated = [...current, ...newRows];
      localStorage.setItem(this.tableName, JSON.stringify(updated));

      // Trigger realtime update for each new row
      for (const row of newRows) {
        publishTableChange(this.tableName, 'INSERT', row);
      }

      // Return matching type format
      return { data: Array.isArray(rows) ? newRows : newRows[0], error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  // UPDATE mutation
  async update(values: any) {
    try {
      let data = JSON.parse(localStorage.getItem(this.tableName) || '[]');
      const updatedRows: any[] = [];

      data = data.map((item: any) => {
        const matchesAll = this.filters.every(filter => filter(item));
        if (matchesAll) {
          const updatedItem = {
            ...item,
            ...values,
            updated_at: new Date().toISOString()
          };
          updatedRows.push(updatedItem);
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem(this.tableName, JSON.stringify(data));

      // Trigger realtime update for each updated row
      for (const row of updatedRows) {
        publishTableChange(this.tableName, 'UPDATE', row);
      }

      return { data: updatedRows, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  // DELETE mutation
  async delete() {
    try {
      const data = JSON.parse(localStorage.getItem(this.tableName) || '[]');
      
      const kept = data.filter((item: any) => {
        if (this.filters.length === 0) return true;
        const matchesAll = this.filters.every(filter => filter(item));
        return !matchesAll;
      });

      const removed = data.filter((item: any) => {
        if (this.filters.length === 0) return false;
        const matchesAll = this.filters.every(filter => filter(item));
        return matchesAll;
      });

      localStorage.setItem(this.tableName, JSON.stringify(kept));

      // Trigger realtime update for each removed row
      for (const row of removed) {
        publishTableChange(this.tableName, 'DELETE', row);
      }

      return { data: removed, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
}

// Mock Auth Class
class MockAuth {
  async getSession() {
    try {
      const sessionStr = localStorage.getItem('sb-session');
      if (sessionStr) {
        return { data: { session: JSON.parse(sessionStr) }, error: null };
      }
    } catch (e) {
      console.error("[MockAuth] Error reading session:", e);
    }
    return { data: { session: null }, error: null };
  }

  async signInWithOAuth(options: { provider: string; options?: any }) {

    // Generate a mock user session matching Supabase User structure
    const mockUser = {
      id: "3b97d02d-a53b-4cd8-af61-2432172656c6", // Use recovered user profile ID
      email: "talk2muhammadbello@gmail.com",
      user_metadata: {
        avatar_url: "https://avatars.githubusercontent.com/u/60035968?v=4",
        name: "Muhammad Bello",
        user_name: "devmab"
      },
      role: "authenticated",
      aud: "authenticated",
      created_at: new Date().toISOString()
    };

    const mockSession = {
      user: mockUser,
      access_token: "mock-jwt-token-access-12345",
      refresh_token: "mock-jwt-token-refresh-12345",
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: "bearer"
    };

    localStorage.setItem('sb-session', JSON.stringify(mockSession));

    // Ensure user profile exists in localStorage profiles table
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    if (!profiles.some((p: any) => String(p.id) === String(mockUser.id))) {
      profiles.push({
        id: mockUser.id,
        username: mockUser.user_metadata.name,
        avatar_url: mockUser.user_metadata.avatar_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    // Simulate page reload to apply authentication
    setTimeout(() => {
      window.location.reload();
    }, 100);

    return { data: { provider: options.provider, url: window.location.href }, error: null };
  }

  async signOut() {
    localStorage.removeItem('sb-session');
    setTimeout(() => {
      window.location.reload();
    }, 100);
    return { error: null };
  }
}

// Exported Client Object
export const supabase = {
  from(tableName: string) {
    return new MockPostgrestBuilder(tableName);
  },
  
  auth: new MockAuth(),

  channel(name: string) {
    return new MockChannel(name);
  },

  removeChannel(channel: MockChannel) {
    activeChannels.delete(channel);
  }
} as any;
