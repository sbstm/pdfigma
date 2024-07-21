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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format, addDays, isBefore, startOfToday, sub } from "date-fns";
import { cn } from "@/lib/utils";
import { readMatapelajaran } from "@/lib/actions/matapelajaran.actions";
import { createActivity } from "@/lib/actions/activity.actions";

const FormSchema = z.object({
  name: z.string(),
  jenis: z.enum(["quiz", "figma"]),
  materi: z.string(),
  selesai: z.boolean(),
  dateline: z.string(),
  subMapel: z.string(),
});

const CreateActivity = () => {
  const [dataMataPelajaran, setDataMataPelajaran] = useState<any[]>([]);
  const [selectMataPelajaran, setSelectMataPelajaran] = useState<any[]>([]);
  const [subMapelOptions , setSubMapelOptions] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any>(null);
  const [date, setDate] = useState<Date>(new Date());

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      jenis: undefined,
      materi: "",
      dateline: "",
      selesai: false,
      subMapel: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoggedInUser();
        const response = await readMatapelajaran();
        setDataUser(data);
        setDataMataPelajaran(response.documents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubMapelChange = (mapelid:any) => {
    const selectedValue = mapelid
    setSelectMataPelajaran(selectedValue);
    const selectedMapelObj = dataMataPelajaran.find(item => item.$id.toString() === selectedValue);
    setSubMapelOptions(selectedMapelObj ? selectedMapelObj.subMapel : []);
  }
  
  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await createActivity(data);
      toast({
        variant: "default",
        title: "Success",
        description: "data berhasil dibuat",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "data gagal dibuat",
      });
      console.error(err);
    }
  }



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <Input {...field} placeholder="Name" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="materi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Materi</FormLabel>
              <Textarea {...field} placeholder="Deskripsi materi" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jenis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelas</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="jenis activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="figma">Figma</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pilih Tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="flex w-auto flex-col space-y-2 p-2"
                >
                  <Select
                    onValueChange={(value) => {
                      const newDate = addDays(new Date(), parseInt(value));
                      setDate(newDate);
                      if (newDate) {
                        field.onChange(newDate.toISOString());
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        if (newDate) {
                          if (!isBefore(newDate, startOfToday())) {
                            setDate(newDate);
                            field.onChange(newDate.toISOString());
                          }
                        }
                      }}
                      disabled={(date) => isBefore(date, startOfToday())}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label htmlFor="Mapel">Mata Pelajaran</Label>
            <Select onValueChange={handleSubMapelChange}>
              <SelectTrigger className="">
                <SelectValue placeholder="Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dataMataPelajaran.map((item) => (
                    <SelectItem value={item.$id ?? ""}>{item.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectMataPelajaran && (
              <FormField
              control={form.control}
              name="subMapel"
              render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="">
                <SelectValue placeholder="Sub Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                {subMapelOptions.map((subItem) => (
                    <SelectItem value={subItem.$id ?? ""}>{subItem.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
              )}
              />

             )}


        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateActivity;
