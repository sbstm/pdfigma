"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { authFormSchema } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "@/lib/actions/user.action";
import { Form, FormControl, FormField } from "./ui/form";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

import { Skeleton } from "./ui/skeleton";
import { toast } from "./ui/use-toast";

export function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await signIn({
        email: data.email,
        password: data.password,
      });
      toast({
        variant: "default",
        title: "Login Berhasil",
        description: "Anda berhasil login",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Gagal",
        description: "Email atau password salah",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen ">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-screen lg:grid lg:grid-cols-2"
      >
        <ResizablePanel className="flex items-center justify-center py-12 h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className="mx-auto max-w-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Login</CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              required
                            />
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <div className="grid gap-2">
                            <div className="flex items-center">
                              <Label htmlFor="password">Password</Label>
                              
                            </div>
                            <Input
                              {...field}
                              id="password"
                              type="password"
                              required
                            />
                          </div>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline">
                      Register
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </ResizablePanel>
        <ResizableHandle  withHandle />
        <ResizablePanel className="hidden bg-muted lg:block" maxSize={70} defaultSize={10}>
          <Skeleton className="w-full h-full" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
