// pages/auth.js

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

const LoginPage = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-800">
          Welcome
        </CardTitle>
        <CardDescription>
          Sign in to your account or create a new one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Login
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="register">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Sign Up
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
