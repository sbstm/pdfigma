"use client";
import React, { useEffect, useState } from "react";
import { signIn, signUp } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { authFormSchema } from "@/lib/utils";
import { Form } from "./ui/form";
import {CustomInput} from "./CustumInput";
import Link from "next/link";
import Image from "next/image";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      tanggal_lahir: "",
      jk: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(data);
    const defrole = "siswa";

    try {
      if (type === "sign-up") {
        const userData = {
          email: data.email,
          password: data.password,
          firstName: data.firstName!,
          lastName: data.lastName!,
          name: `${data.firstName} ${data.lastName}`,
          role: defrole,
          tanggal_lahir: data.tanggal_lahir,
          jk: data.jk || "", // Provide a default value for jk
        };
       
        const newUser = await signUp(userData);
        setUser(newUser);
        router.push("/");
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        console.log(response);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className=" flex flex-col w-96">
      <div className="flex flex-row gap-2  justify-between w-full">
        <Link
          href="/sign-in"
          className="cursor-pointer flex items-center w-full"
        >
          <Card className="w-full text-center p-4"> Sign In</Card>
        </Link>
        <Link
          href="/sign-up"
          className="cursor-pointer flex items-center w-full"
        >
          <Card className="w-full text-center p-4"> Sign Up</Card>
        </Link>
      </div>
      {user ? (
        <div className="flex flex-col gap-4">yey kamu berhasil login</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <div>
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                  />
                  <CustomInput
                    control={form.control}
                    name="tanggal_lahir"
                    label="Tanggal Lahir"
                    placeholder="Enter your tanggal lahir"
                    type="date"
                  />
                  <CustomInput
                    control={form.control}
                    name="jk"
                    label="Jenis Kelamin"
                    placeholder="Pilih Jenis Kelamin"
                  />
                </div>
              )}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
