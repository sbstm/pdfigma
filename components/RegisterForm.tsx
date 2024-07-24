"use client";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { authFormSchema } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { CalendarIcon } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      tanggal_lahir: "",
      jk: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const userData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
        role: "siswa",
        tanggal_lahir: data.tanggal_lahir,
        jk: data.jk || "", // Provide a default value for jk
      };
      const newUser = await signUp(userData);
      setUser(newUser);
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      console.log(error);
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
                  <CardTitle className="text-xl">Sign Up</CardTitle>
                  <CardDescription>
                    Enter your information to create an account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input
                              {...field} // Use the field props
                              id="first-name"
                              placeholder="nama depan"
                            />
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                              {...field} // Use the field props
                              id="last-name"
                              placeholder="nama belakang"
                            />
                          </div>
                        )}
                      />
                    </div>

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
                          />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input {...field} id="password" type="password" />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jk"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="jk">Jenis Kelamin</Label>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="">
                              <SelectValue placeholder="Jenis Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Laki-laki">
                                  Laki-laki
                                </SelectItem>
                                <SelectItem value="Perempuan">
                                  Perempuan
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tanggal_lahir"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                          <Input {...field} id="tanggal_lahir" type="date"  />
                        </div>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Create an account
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                      Login
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="hidden bg-muted lg:block" maxSize={70} >
          <Skeleton className="w-full h-full" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
