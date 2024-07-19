import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submateriFormSchema } from "@/lib/utils";
import { CreateSubMapel } from "@/lib/actions/submapel.actions";
import { toast } from "./ui/use-toast";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const CreateSubmateri = ({ id }: { id: any }) => {
  const formSchema = submateriFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      link_buku: "",
      link_figma: "",
      embed_code: "",
    },
  });
  const onSubmit = async (data: any) => {
    const submateri = {
      ...data,
      selesai: false,
      matapelajaran: id,
    };
    console.log(submateri);
    try {
      await CreateSubMapel(submateri);
      toast({
        variant: "default",
        title: "Success",
        description: "Submateri berhasil dibuat",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Drawer>
      <DrawerTrigger>
        <Button>Create Submateri</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="modal p-4">
          <Form {...form}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Submateri</Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => <Input {...field} id="name" />}
                />
              </div>
              <div>
                <Label htmlFor="link_buku">Link Buku</Label>
                <FormField
                  control={form.control}
                  name="link_buku"
                  render={({ field }) => (
                    <Input {...field} type="url" id="link_buku" />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="link_figma">Link Figma</Label>
                <FormField
                  control={form.control}
                  name="link_figma"
                  render={({ field }) => (
                    <Input {...field} type="url" id="link_figma" />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="embed_code">Embed Code</Label>
                <FormField
                  control={form.control}
                  name="embed_code"
                  render={({ field }) => (
                    <Textarea {...field} id="embed_code" rows={4} />
                  )}
                />
              </div>
              <Button
                onClick={() => onSubmit(form.getValues())}
                className="w-full"
              >
                Submit
              </Button>
            </div>
          </Form>
          <DrawerFooter className="mt-4">
            <DrawerClose className="w-full">
              <Button className="w-full" variant="outline">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateSubmateri;
