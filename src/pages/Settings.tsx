
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircleIcon, CheckCircleIcon, KeyIcon, SendIcon, ShieldIcon, UserIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings: React.FC = () => {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your application preferences and account settings
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-flex">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="api">API & Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="general" className="space-y-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                  <CardDescription>
                    Configure general application preferences and behavior
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="hotel-name">Hotel Name</Label>
                    <Input id="hotel-name" defaultValue="Grand Plaza Resort & Spa" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select defaultValue="America/New_York">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="USD">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                        <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                        <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <div className="text-sm text-muted-foreground">
                        Enable dark mode for the application
                      </div>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-refresh">Auto Refresh Data</Label>
                      <div className="text-sm text-muted-foreground">
                        Automatically refresh data every 5 minutes
                      </div>
                    </div>
                    <Switch id="auto-refresh" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Settings</CardTitle>
                  <CardDescription>
                    Configure default constraints for price optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="min-price">Default Minimum Price ($)</Label>
                    <Input id="min-price" type="number" defaultValue="80" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="max-price">Default Maximum Price ($)</Label>
                    <Input id="max-price" type="number" defaultValue="500" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="profit-margin">Minimum Profit Margin (%)</Label>
                    <Input id="profit-margin" type="number" defaultValue="15" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="price-change">Maximum Price Change (%)</Label>
                    <Input id="price-change" type="number" defaultValue="10" />
                  </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">John Smith</h3>
                      <p className="text-sm text-muted-foreground">Revenue Manager</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.smith@example.com" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Profile</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Update your password regularly to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button>
                    <ShieldIcon className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>
                    Manage your API keys and access to the PriceOptima API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex">
                      <Input 
                        id="api-key" 
                        type={apiKeyVisible ? "text" : "password"} 
                        value="api_51fb97aec7d9bb98765432198765432123456789" 
                        readOnly
                        className="rounded-r-none"
                      />
                      <Button 
                        variant="outline" 
                        className="rounded-l-none border-l-0"
                        onClick={() => setApiKeyVisible(!apiKeyVisible)}
                      >
                        {apiKeyVisible ? "Hide" : "Show"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Keep your API key secure. Do not share it publicly.
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <h4 className="font-medium">API Access Status</h4>
                      <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                        <CheckCircleIcon className="h-4 w-4" />
                        Active
                      </div>
                    </div>
                    <Button variant="outline">
                      <KeyIcon className="mr-2 h-4 w-4" />
                      Regenerate Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>External Integrations</CardTitle>
                  <CardDescription>
                    Manage connections to third-party systems and services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Booking.com API</div>
                      <div className="text-sm text-muted-foreground">
                        Pull competitor pricing and availability
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircleIcon className="h-4 w-4" />
                      Connected
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Expedia Partner API</div>
                      <div className="text-sm text-muted-foreground">
                        Sync inventory and pricing automatically
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircleIcon className="h-4 w-4" />
                      Disconnected
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Stripe Payment Gateway</div>
                      <div className="text-sm text-muted-foreground">
                        Process payments and subscriptions
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircleIcon className="h-4 w-4" />
                      Connected
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button>
                    Manage Integrations
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control how and when you receive alerts and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive important alerts via email
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive critical alerts via text message
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Browser Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive desktop notifications in your browser
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-3">Notification Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Price change alerts</div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Demand forecast updates</div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">System notifications</div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Marketing opportunities</div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Product updates</div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    Disable All
                  </Button>
                  <Button>
                    <SendIcon className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
