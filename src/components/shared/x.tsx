"use client";

import * as React from "react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useTheme } from "next-themes";
import { Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function XSS() {
  const { setTheme, theme } = useTheme();
  const [messages, setMessages] = React.useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = React.useState("");
  const [sliderValue, setSliderValue] = React.useState(50);
  const [switchValues, setSwitchValues] = React.useState({
    airplaneMode: false,
    darkMode: false,
  });

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setInput("");
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm an AI assistant. How can I help you?",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-1">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Delete Account Confirmation */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Create Project Modal */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Create Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input placeholder="Project name" />
              <Input placeholder="Framework" />
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Create</Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="MM" className="col-span-1" />
                <Input placeholder="YY" className="col-span-1" />
                <Input placeholder="CVC" className="col-span-1" />
              </div>
              <Button className="w-full" size="sm">
                Pay Now
              </Button>
            </CardContent>
          </Card>

          {/* Create Account Form */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Button className="w-full" size="sm">
                Create Account
              </Button>
            </CardContent>
          </Card>

          {/* Buttons Showcase */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Buttons Showcase</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button>
                <Mail className="mr-2 h-4 w-4" /> Login with Email
              </Button>
            </CardContent>
          </Card>

          {/* Badges Showcase */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>

          {/* Toggle and Switch */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Toggle & Switch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                <Switch
                  id="airplane-mode"
                  checked={switchValues.airplaneMode}
                  onCheckedChange={(checked) =>
                    setSwitchValues((prev) => ({
                      ...prev,
                      airplaneMode: checked,
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch
                  id="dark-mode"
                  checked={switchValues.darkMode}
                  onCheckedChange={(checked) => {
                    setSwitchValues((prev) => ({ ...prev, darkMode: checked }));
                    setTheme(checked ? "dark" : "light");
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Slider */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Slider</CardTitle>
            </CardHeader>
            <CardContent>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                onValueChange={(value) => setSliderValue(value[0])}
              />
              <p className="mt-2 text-center">Value: {sliderValue}</p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Tabbed Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <p>Manage your account settings and preferences here.</p>
                </TabsContent>
                <TabsContent value="password">
                  <p>Change your password and security settings here.</p>
                </TabsContent>
                <TabsContent value="settings">
                  <p>Configure application settings and notifications here.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Warning: This action cannot be undone. Please be certain.
              </p>
              <Button variant="destructive" className="w-full">
                Delete My Account
              </Button>
            </CardContent>
          </Card>

          {/* Card Component */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>This is a basic card component.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the main content of the card. You can put any
                information here.
              </p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>

          {/* Card with Action */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>This card has an action button.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Click the button below to trigger an action.</p>
            </CardContent>
            <CardFooter>
              <Button>Trigger Action</Button>
            </CardFooter>
          </Card>

          {/* Invoices Table */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>INV002</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>INV003</TableCell>
                    <TableCell>Unpaid</TableCell>
                    <TableCell>Bank Transfer</TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$750.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Chatbot */}
          <Card className="col-span-2 row-span-2 h-fit">
            <CardHeader>
              <CardTitle>AI Chatbot</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] overflow-y-auto flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex w-full space-x-2"
              >
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit">Send</Button>
              </form>
            </CardFooter>
          </Card>

          {/* Login Form */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full">Log In</Button>
            </CardContent>
          </Card>

          {/* Tables */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Data Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Alice Johnson</TableCell>
                    <TableCell>alice@example.com</TableCell>
                    <TableCell>Admin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob Smith</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Carol Williams</TableCell>
                    <TableCell>carol@example.com</TableCell>
                    <TableCell>Manager</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Live Toast Notification */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Trigger Notification</Button>
            </CardContent>
          </Card>

          {/* Share Document */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Share Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter email address" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">Share</Button>
            </CardContent>
          </Card>

          {/* Profile Page */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://example.com" />
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
