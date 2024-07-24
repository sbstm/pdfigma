"use client";
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
  Card,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis, Line, ComposedChart } from "recharts";

const Test = async () => {
  const data = await [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 5800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 500,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="p-4 min-h-screen gap-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Mata Pelajaran</SelectLabel>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Matematika">Matematika</SelectItem>
            <SelectItem value="Ipa">Ipa</SelectItem>
            <SelectItem value="PKN">PKN</SelectItem>
            <SelectItem value="IPS">IPS</SelectItem>
            <SelectItem value="TIK">TIK</SelectItem>
            <SelectItem value="Algoritma Pemrograman">
              Algoritma Pemrograman
            </SelectItem>
            <SelectItem value="Jaringan Komputer">Jaringan Komputer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 h-auto">
        <Card className="h-full">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
            <YAxis />
            <XAxis dataKey="name" />
              <Bar dataKey="amt" fill="#ffc658" />
          <Line type="monotone" dataKey="amt" />
        </ComposedChart>
          
        </Card>
        <Card className="h-full">
          
        </Card>
      </div>
    </div>
  );
};

export default Test;
