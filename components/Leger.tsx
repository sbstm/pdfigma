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
import { getNilai } from "@/lib/actions/nilai.actions";
import { it } from "node:test";

const Leger = () => {
  const [nilaiData, setNilaiData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNilai();
        setNilaiData(data.documents); // Update state with fetched data
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately (e.g., display an error message to the user)
      }
    };
    fetchData(); // Call the function to fetch data
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <div>
      <Table>
        <TableCaption>ggwp</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">user</TableHead>
            {nilaiData[0]?.value?.map((item: any, index: any) => (
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
                <TableCell key={index}>{value}</TableCell>
              ))}
              <TableCell className="font-medium">
                {item.value
                  ?.reduce((total: any, value: any, index: any) => {
                    return total + value * (item.persentase?.[index] || 0);
                  }, 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leger;
