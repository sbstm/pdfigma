"use client";
import { use, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { getUserClass } from "@/lib/actions/user.action";
import { Kelas } from "@/constants/Kelas";
import { readMatapelajaran } from "@/lib/actions/matapelajaran.actions";
import { nilaiFormSchema } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "./ui/form";
import { createNilai } from "@/lib/actions/nilai.actions";

const Initarray = () => {
  const [mapel, setMapel] = useState<MapelParams[]>([]);
  const [rows, setRows] = useState<RowData[]>([
    { name: "", value: 0, percentage: 0 },
  ]);
  const [kelas, setKelas] = useState("");

  const formSchema = nilaiFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: [],
      persentase: [],
      name: [],
      kelas: "",
      guru: "",
      final: 0,
      user: "",
    },
  });

  const addRow = () => {
    setRows([...rows, { name: "", value: 0, percentage: 0 }]);
  };

  const handleInputChange = (
    index: number,
    field: keyof RowData,
    value: string | number
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value as never; // Type assertion diperlukan karena TypeScript tidak bisa memastikan tipe data
    setRows(newRows);
  };

  const removeRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1); // Menghapus 1 elemen pada indeks yang ditentukan
    setRows(newRows);
  };

  useEffect(() => {
    const init = async () => {
      const data = await readMatapelajaran();
      setMapel(data);
    };
    init();
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const final = rows.reduce((acc, row) => {
      
      return acc + row.percentage;
    }, 0);
    const finalValue = rows.reduce((acc, row) => {
      return acc + row.value;
    }, 0);
    const finalPercentage = rows.reduce((acc, row) => {
      return acc + row.percentage;
    }, 0);
    data.final = final;
    data.value = rows.map(() => 0);
    data.persentase = rows.map((row) => row.percentage / 100);
    data.name = rows.map((row) => row.name);
    console.log(data);
    console.log(data.kelas);
    console.log(finalPercentage);
    if (finalPercentage !== 100) {
      alert("Percentage must be 100");
      return;
    } else {
      const loop = await getUserClass("10A");
      try {
        loop.map(async (item: any) => {
          data.user = item.$id;
          const result = await createNilai(
            data.final,
            data.value,
            data.persentase,
            data.matapelajaran,
            data.name,
            data.kelas,
            data.user
          );
          console.log(result);
        });
        alert("data berhasil diinput");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Buat Tabel Nilai</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription>
              <div className="grid gap-2">
                <Label htmlFor="Mapel">Mata Pelajaran</Label>
                <FormField
                  control={form.control}
                  name="matapelajaran"
                  render={({ field }) => (
                    <Select  onValueChange={field.onChange}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Mata Pelajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select</SelectLabel>
                          {mapel.map((item) => (
                            <SelectItem value={item.$id ?? ""}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FormField
                  control={form.control}
                  name="kelas"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <Label htmlFor="kelas">Kelas</Label>
                      <SelectTrigger className="">
                        <SelectValue placeholder="kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select</SelectLabel>
                          {Kelas.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </DrawerDescription>
            <div className="flex justify-center items-center w-full p-5">
              <Table className="w-auto m-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">User</TableHead>
                    <TableHead className="w-[100px]">Percentage</TableHead>
                    <TableHead >
                      <Button className="rounded-xl" onClick={addRow}>Add Row</Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <Input
                              placeholder="jenis nilai"
                              value={row.name}
                              onChange={(e) =>
                                handleInputChange(index, "name", e.target.value)
                              }
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name="persentase"
                          render={({ field }) => (
                            <Input
                              type="number"
                              placeholder="Persentase"
                              value={row.percentage}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "percentage",
                                  parseFloat(e.target.value)
                                )
                              }
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                        className="rounded-xl"
                          variant="destructive"
                          onClick={() => removeRow(index)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <DrawerFooter>
              <Button onClick={() => onSubmit(form.getValues())}>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </form>
    </Form>
  );
};

export default Initarray;
