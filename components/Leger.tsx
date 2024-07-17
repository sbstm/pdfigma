"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { getaNilai, getNilai, updateNilai } from "@/lib/actions/nilai.actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Kelas } from "@/constants/Kelas";
import { readMatapelajaran } from "@/lib/actions/matapelajaran.actions";
import Loading from "./Loading";
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

const Leger = () => {
  const [nilaiData, setNilaiData] = useState<any[]>([]);
  const [rataRataValues, setRataRataValues] = useState<Record<string, number>>(
    {}
  );
  const [mapel, setMapel] = useState<MapelParams[]>([]);
  const [editedValues, setEditedValues] = useState<Record<string, number[]>>(
    {}
  );
  const [selectedKelas, setSelectedKelas] = useState("");
  const [matapelajaran, setMatapelajaran] = useState("");
  const [namamatapelajaran, setNamaMatapelajaran] = useState("");
  const [loading, setLoading] = useState(false);

  const addRow = () => {
    const newRow = {
      $id: `new-${Date.now()}`, // Generate a unique ID for the new row
      user: { name: "" },
      value: Array(nilaiData[0]?.value.length || 1).fill(0),
      persentase: Array(nilaiData[0]?.value.length || 1).fill(0),
    };
    setNilaiData((prev) => [...prev, newRow]);
  };

  const handleEditChange = (
    documentId: string,
    index: number,
    newValue: number
  ) => {
    setEditedValues((prev) => ({
      ...prev,
      [documentId]: prev[documentId]
        ? prev[documentId].map((val, i) => (i === index ? newValue : val))
        : Array(nilaiData[0].value.length)
            .fill(0)
            .map((_, i) => (i === index ? newValue : 0)),
    }));
  };

  const handleSave = async () => {
    console.log(editedValues);
    try {
      for (const documentId in editedValues) {
        const originalValues =
          nilaiData.find((item) => item.$id === documentId)?.value || [];
        const updatedValues = editedValues[documentId].map(
          (editedValue, index) => {
            return editedValue !== 0 ? editedValue : originalValues[index]; // Use original if not edited
          }
        );

        await updateNilai(documentId, updatedValues);
      }
      const data = await getNilai(selectedKelas, matapelajaran);
      setNilaiData(data.documents);
      setEditedValues({});
      toast({
        variant: "default",
        title: "Success",
        description: "Values updated successfully",
      });
    } catch (error) {
      console.error("Error saving data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update values",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedKelas);
      try {
        setLoading(true);
        const data = await getNilai(selectedKelas, matapelajaran);
        setNilaiData(data.documents);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const init = async () => {
      const data = await readMatapelajaran();
      setMapel(data);
    };
    init();
    fetchData();
  }, [selectedKelas, matapelajaran]);

  return (
    <div>
      <div className="flex flex-row gap-5 w-1/2">
        <div className=" w-full">
          <Select onValueChange={setSelectedKelas}>
            <Label htmlFor="kelas">Kelas</Label>
            <SelectTrigger className="">
              <SelectValue placeholder={selectedKelas || "kelas"} />
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
        </div>
        <div className="w-full">
          <Select onValueChange={setMatapelajaran}>
            <Label htmlFor="Mata Pelajaran">Mata Pelajaran</Label>
            <SelectTrigger className="">
              <SelectValue placeholder={matapelajaran || "Mata Pelajaran"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                {mapel.map((item) => (
                  <SelectItem key={item.$id} value={item.$id ?? ""}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
        {nilaiData.length === 0 ? <Skeleton />:
      <Table>
        <TableCaption>
          Tabel nilai{" "}
          {mapel.find((item) => item.$id === matapelajaran)?.name || ""} kelas{" "}
          {selectedKelas}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead align="center">nama</TableHead>
            {nilaiData[0].name?.map((item: any, index: any) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
            <TableHead className="w-[100px]">rata rata</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nilaiData.map((item) => (
            <TableRow key={item.$id}>
              <TableCell className="font-medium">
                {item.user ? item.user.name : "User Not Found"}
              </TableCell>

              {item.value?.map((value: any, index: any) => (
                <TableCell key={index}>
                  <Input
                    type="number"
                    max={100}
                    min={0}
                    value={editedValues[item.$id]?.[index] || value}
                    onChange={(e) =>
                      handleEditChange(item.$id, index, e.target.valueAsNumber)
                    }
                  />
                </TableCell>
              ))}
              <TableCell className="font-medium">
                {item.value
                  ?.reduce((total: any, value: any, index: any) => {
                    return total + value * (item.persentase?.[index] || 0);
                  }, 0)
                  .toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>{nilaiData.length}</TableCell>
            {nilaiData[0].persentase.map((item: any, index: any) => (
              <TableCell key={index}>{(item*100).toFixed(0)} %</TableCell>
            ))}
            <TableCell className="w-[100px]"> </TableCell>
          </TableRow>
        </TableBody>
      </Table>
       }
    
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default Leger;
