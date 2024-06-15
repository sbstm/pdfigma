"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { createMatapelajaran } from "@/lib/actions/matapelajaran.actions";
import { mapelFormSchema } from "@/lib/utils";
import { z } from "zod";
import { set } from "date-fns";
import {CustomInputMapel} from "./CustumInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { useToast } from "./ui/use-toast";

const Inputform = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = mapelFormSchema();
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      kelas: "",
      deskripsi: "",
      image_url: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(data);
    try {
      const mapelData = {
        name: data.name,
        deskripsi: data.deskripsi,
        image_url: data.image_url,
        kelas: data.kelas,
      };
      const newMapel = await createMatapelajaran(mapelData);
      console.log(newMapel);
      setSubmitting(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handletoast = () => {
    toast({
      description: (submitting === true ? "Data masuk." : "Data gagal masuk."),
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomInputMapel
            control={form.control}
            name="name"
            label="Nama Mata Pelajaran"
            placeholder="Nama Mata Pelajaran"
            type="text"
          />
          <CustomInputMapel
            control={form.control}
            name="kelas"
            label="Kelas"
            placeholder="Kelas"
            type="text"
          />
          <CustomInputMapel
            control={form.control}
            name="deskripsi"
            label="Deskripsi"
            placeholder="Deskripsi"
            type="text"
          />
          <CustomInputMapel
            control={form.control}
            name="image_url"
            label="Image URL"
            placeholder="Image URL"
            type="text"
          />
          <Button type="submit" disabled={isLoading}
          onClick={handletoast} >
            {isLoading ? "Membuat..." : "Buat Mata Pelajaran"}
          </Button>
          
        </form>
      </Form>
      <Button
          variant="outline"
          onClick={() => {
            toast({
              description: "Your message has been sent.",
            })
          }}
          >
            test
          </Button>
    </div>
  );
};

export default Inputform;
