"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { getLoggedInUser, updateUser } from "@/lib/actions/user.action";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const Adminsetup = () => {
  const [dataUser, setDataUser] = useState<any>(null);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoggedInUser()
        setDataUser(data);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  },[])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.pin === "2103064") {
      try {
        await updateUser(dataUser.$id)
        toast({
          variant: "default",
          title: "Success",
          description: "data di update",
        });
      } catch (err) {
        console.error(err);
      
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 mx-auto" // Center the form
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={7} {...field}>
                  <InputOTPGroup>
                    {[...Array(7)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Adminsetup;
