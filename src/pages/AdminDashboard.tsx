import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  LineChart, Line, 
  XAxis, YAxis, 
  Tooltip 
} from 'recharts';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  TrendingUp,
  Eye,
  MessageSquare,
  BarChart3,
  Calendar,
  CircleUser,
  FolderKanban,
  Mail
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ProjectsManager } from '@/components/admin/ProjectsManager';
import { BlogPostsManager } from '@/components/admin/BlogPostsManager';
import ContactSubmissionsManager from '@/components/admin/ContactSubmissionsManager';

const trafficData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 280 },
  { name: 'May', value: 590 },
  { name: 'Jun', value: 430 },
  { name: 'Jul', value: 650 },
];

const usersData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 65 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 120 },
  { name: 'Jun', value: 175 },
  { name: 'Jul', value: 210 },
];

const postsByCategory = [
  { name: 'React', value: 12 },
  { name: 'JavaScript', value: 8 },
  { name: 'CSS', value: 5 },
  { name: 'TypeScript', value: 7 },
  { name: 'Node.js', value: 4 },
];

const posts = [
  {
    id: 'post-1',
    title: 'Building Scalable React Applications',
    date: 'Mar 15, 2023',
    status: 'Published',
    views: 1245,
    comments: 24
  },
  {
    id: 'post-2',
    title: 'The Future of Web Development',
    date: 'Feb 28, 2023',
    status: 'Published',
    views: 980,
    comments: 18
  },
  {
    id: 'post-3',
    title: 'Optimizing Database Performance',
    date: 'Feb 15, 2023',
    status: 'Published',
    views: 756,
    comments: 12
  },
  {
    id: 'post-4',
    title: 'Getting Started with TypeScript',
    date: 'Jan 22, 2023',
    status: 'Draft',
    views: 0,
    comments: 0
  },
];

const users = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    lastActive: 'Today at 10:45 AM'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    lastActive: 'Yesterday at 3:20 PM'
  },
  {
    id: 'user-3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    role: 'Viewer',
    lastActive: 'Jul 15, 2023'
  },
];

const StatCard = ({ icon: Icon, title, value, trend, color = 'primary' }: {
  icon: React.ElementType, 
  title: string, 
  value: string, 
  trend?: string,
  color?: string
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h4 className="text-2xl font-bold">{value}</h4>
          {trend && (
            <p className={`text-xs ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'} mt-1`}>
              {trend} from last month
            </p>
          )}
        </div>
        <div className={`bg-${color}/10 text-${color} p-3 rounded-full`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <>
      <Helmet>
        <title>Admin | dashboard</title>
        <meta name="description" content="Admin dashboard page" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="md:w-64 flex flex-col gap-2">
                <div className="p-4 bg-card rounded-lg border border-border mb-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-primary/10 rounded-full p-2">
                      <LayoutDashboard className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold">Admin Panel</h2>
                  </div>
                  
                  <nav className="space-y-1">
                    <Button 
                      variant={activeTab === 'overview' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab('overview')}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Overview
                    </Button>
                    <Button 
                      variant={activeTab === 'projects' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab('projects')}
                    >
                      <FolderKanban className="mr-2 h-4 w-4" />
                      Projects
                    </Button>
                    <Button 
                      variant={activeTab === 'posts' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab('posts')}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Posts
                    </Button>
                    <Button 
                      variant={activeTab === 'contact' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab('contact')}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button 
                      variant={activeTab === 'users' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab('users')}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Users
                    </Button>
                    <Button 
                      variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </nav>
                </div>
                
                <Button 
                  variant="outline" 
                  className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
              
              <div className="flex-1">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <StatCard 
                        icon={Eye} 
                        title="Total Page Views" 
                        value="24,532" 
                        trend="+12.3%" 
                      />
                      <StatCard 
                        icon={FileText} 
                        title="Total Posts" 
                        value="48" 
                        trend="+4.2%" 
                      />
                      <StatCard 
                        icon={Users} 
                        title="Registered Users" 
                        value="1,429" 
                        trend="+18.7%" 
                      />
                      <StatCard 
                        icon={MessageSquare} 
                        title="Comments" 
                        value="592" 
                        trend="-2.4%" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Website Traffic</CardTitle>
                          <CardDescription>Daily visits over the last month</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <AreaChart
                            width={500}
                            height={300}
                            data={trafficData}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 0,
                            }}
                            className="max-w-full"
                          >
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" />
                          </AreaChart>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Posts by Category</CardTitle>
                          <CardDescription>Distribution of content categories</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <BarChart
                            width={500}
                            height={300}
                            data={postsByCategory}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 0,
                            }}
                            className="max-w-full"
                          >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="hsl(var(--primary))" />
                          </BarChart>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>New user registrations over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <LineChart
                          width={1000}
                          height={300}
                          data={usersData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                          className="max-w-full"
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
                        </LineChart>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeTab === 'projects' && <ProjectsManager />}
                
                {activeTab === 'posts' && <BlogPostsManager />}
                
                {activeTab === 'contact' && <ContactSubmissionsManager />}
                
                {activeTab === 'users' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h1 className="text-3xl font-bold">Manage Users</h1>
                      <Button>
                        <Users className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>Manage user accounts and permissions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="py-3 px-4 text-left font-medium">Name</th>
                                <th className="py-3 px-4 text-left font-medium">Email</th>
                                <th className="py-3 px-4 text-left font-medium">Role</th>
                                <th className="py-3 px-4 text-left font-medium">Last Active</th>
                                <th className="py-3 px-4 text-left font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user) => (
                                <tr key={user.id} className="border-b">
                                  <td className="py-3 px-4">
                                    <div className="flex items-center">
                                      <div className="bg-primary/10 rounded-full p-1 mr-2">
                                        <CircleUser className="h-5 w-5 text-primary" />
                                      </div>
                                      {user.name}
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">{user.email}</td>
                                  <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      user.role === 'Admin' 
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                        : user.role === 'Editor'
                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                    }`}>
                                      {user.role}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">{user.lastActive}</td>
                                  <td className="py-3 px-4">
                                    <div className="flex space-x-2">
                                      <Button variant="ghost" size="sm">Edit</Button>
                                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Settings</h1>
                    
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Manage your website settings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="general" className="w-full">
                          <TabsList className="mb-4">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="appearance">Appearance</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                          </TabsList>
                          <TabsContent value="general" className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Site Title</label>
                              <input 
                                type="text" 
                                defaultValue="My Blog"
                                className="w-full p-2 border rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Site Description</label>
                              <textarea 
                                defaultValue="A blog about web development and technology"
                                className="w-full p-2 border rounded-md"
                                rows={3}
                              />
                            </div>
                            <Button>Save Changes</Button>
                          </TabsContent>
                          <TabsContent value="appearance" className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Theme</label>
                              <select className="w-full p-2 border rounded-md">
                                <option>Light</option>
                                <option>Dark</option>
                                <option>System</option>
                              </select>
                            </div>
                            <Button>Save Changes</Button>
                          </TabsContent>
                          <TabsContent value="notifications" className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Email Notifications</label>
                                <input type="checkbox" defaultChecked className="toggle" />
                              </div>
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">New Comment Alerts</label>
                                <input type="checkbox" defaultChecked className="toggle" />
                              </div>
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">User Registration Alerts</label>
                                <input type="checkbox" className="toggle" />
                              </div>
                            </div>
                            <Button>Save Changes</Button>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
