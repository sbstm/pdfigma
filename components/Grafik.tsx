"use client";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

import React, { useEffect, useState } from "react";
import { getNilai } from "@/lib/actions/nilai.actions";
import { readMatapelajaran } from "@/lib/actions/matapelajaran.actions";
import { Label } from "./ui/label";
import { Kelas } from "@/constants/Kelas";
import { Tooltip, TooltipProvider } from "./ui/tooltip";

const Grafik = () => {
  const [nilaiData, setNilaiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [matapelajaran, setMatapelajaran] = useState<string | null>(null);
  const [mapel, setMapel] = useState<MapelParams[]>([]);
  const [selectedKelas, setSelectedKelas] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedKelas);
      try {
        setLoading(true);
        if (selectedKelas && matapelajaran) {
          
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    const init = async () => {
      const data = await readMatapelajaran();
      setMapel(data);
    };

    init();
    fetchData();
  }, [selectedKelas, matapelajaran]);
  console.log(nilaiData);

  return (
    <div className="">
      <div className="flex flex-row gap-5 w-1/2">
        <div className=" w-full">
          <Select onValueChange={setSelectedKelas}>
            <Label htmlFor="kelas">Kelas</Label>
            <SelectTrigger className="">
              <SelectValue placeholder={selectedKelas || "Kelas"} />
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
      <Card className="">
        <TooltipProvider>
          <CardHeader>
            <CardTitle>Grafik Nilai</CardTitle>
            <CardDescription>
              Mata Pelajaran:{" "}
              {mapel.find((item) => item.$id === matapelajaran)?.name || ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={nilaiData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />

                  <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="value"
                    type="natural"
                    fill="url(#fillMobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </TooltipProvider>
      </Card>
    </div>
  );
};

export default Grafik;
