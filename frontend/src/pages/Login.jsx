import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/utils/api/authApi";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerLoading,
      isSuccess: registerSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
    },
  ] = useLoginUserMutation();

  const handleLoginChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "login") {
      setLogin({ ...login, [name]: value });
    } else {
      setSignup({ ...signup, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "login" ? login : signup;
    const action = type === "login" ? loginUser : registerUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerSuccess && registerData) {
      toast.success(registerData.message || "Registration Successful.");
    }

    if (registerError) {
      toast.success(registerError.message || "Registration Failed.");
    }

    if (loginSuccess && loginData) {
      toast.success(loginData.message || "Login Successful.");
      navigate("/");
    }

    if (loginError) {
      toast.success(loginError.message || "Login Failed.");
    }
  }, [
    loginLoading,
    registerLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-yellow-50">
      {/* // <div className="fixed inset-0 flex items-center justify-center bg-yellow-50 bg-opacity-90"> */}
      <div className="relative">
        <button
          onClick={() => navigate("/")}
          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
        <Tabs
          defaultValue="signin"
          className="w-[400px] bg-white p-6 rounded-lg shadow-lg"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Login to your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={login.email}
                    onChange={(e) => handleLoginChange(e, "login")}
                    placeholder="mohan@email.com"
                    required={true}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={(e) => handleLoginChange(e, "login")}
                    placeholder="••••••••"
                    required={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginLoading}
                  onClick={() => handleRegistration("login")}
                  className="w-full"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...{" "}
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signup.name}
                    onChange={(e) => handleLoginChange(e, "signup")}
                    placeholder="Mohan Raj"
                    required={true}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="current">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signup.email}
                    placeholder="mohan@email.com"
                    onChange={(e) => handleLoginChange(e, "signup")}
                    required={true}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signup.password}
                    onChange={(e) => handleLoginChange(e, "signup")}
                    placeholder="••••••••"
                    required={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerLoading}
                  onClick={() => handleRegistration("signup")}
                  className="w-full"
                >
                  {registerLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...{" "}
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
