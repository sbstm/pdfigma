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
  getNilaiSiswa,
  updateNilai,
} from "@/lib/actions/nilai.actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import {
  readMatapelajaranSiswa,
} from "@/lib/actions/matapelajaran.actions";
import { Skeleton } from "./ui/skeleton";
import { Themegrafik } from "@/constants/Theme";
import { getLoggedInUser } from "@/lib/actions/user.action";

const chartConfig = {
  visitors: {
    label: "Total Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Leger = () => {
  const [nilaiData, setNilaiData] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any>(null);
  const [dataMataPelajaran, setDataMataPelajaran] = useState<any[]>([]);
  const [mapel, setMapel] = useState<MapelParams[]>([]);
  const [matapelajaran, setMatapelajaran] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState<Record<string, boolean>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const init = async () => {
    const data = await getLoggedInUser();
    setDataUser(data);
    const response = await readMatapelajaranSiswa(data.kelas);
    setDataMataPelajaran(response.documents);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getNilaiSiswa(matapelajaran, dataUser.$id);
      setNilaiData(data.documents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
    fetchData();
  }, [dataMataPelajaran]);

  const dataGrafik =
    nilaiData.length > 0
      ? nilaiData[0].value.map((_: any, index: any) => {
          const dataPoint: any = {
            name: nilaiData[0].name[index],
          };

          nilaiData.forEach((item: any) => {
            dataPoint[item.user.name] = item.value[index]; // Nilai siswa dinamis
          });

          return dataPoint;
        })
      : [];
  return (
    <div className="space-y-5">
      <div className="">
        <Select onValueChange={setMatapelajaran}>
          <Label htmlFor="Mata Pelajaran">Mata Pelajaran</Label>
          <SelectTrigger className="">
            <SelectValue placeholder={matapelajaran || "Mata Pelajaran"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select</SelectLabel>
              {dataMataPelajaran.map((item) => (
                <SelectItem key={item.$id} value={item.$id ?? ""}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Grafik Nilai</CardTitle>
            <CardDescription>
              Mata Pelajaran:{" "}
              {mapel.find((item) => item.$id === matapelajaran)?.name || ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full">
              <ResponsiveContainer
                className={"max-w-screen-lg justify-center m-auto"}
              >
                {dataGrafik.length === 0 ? (
                  <div className="w-full h-full pb-5">
                    <div className="flex flex-row w-full h-full items-center">
                      <div className="h-full">
                        <Skeleton className="w-2 h-full " />
                      </div>
                      <div className="w-full">
                        <Skeleton className="w-full h-2 " />
                      </div>
                    </div>
                    <Skeleton className="w-full h-2 mt-[-9px]" />
                  </div>
                ) : (
                  <AreaChart
                    data={dataGrafik}
                    accessibilityLayer
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent indicator="dot" hideLabel />
                      }
                    />
                    {Object.keys(dataGrafik[0])
                      .filter((key) => key !== "name")
                      .map((key, index) => {
                        const colorIndex = index % Themegrafik.length; // Menghitung indeks warna secara siklikal
                        return (
                          <Area
                            key={index}
                            type="monotone"
                            dataKey={key}
                            stroke={Themegrafik[colorIndex].color}
                            fill={Themegrafik[colorIndex].color}
                            fillOpacity={0.05}
                            strokeOpacity={1}
                            strokeDasharray={
                              Themegrafik.length > 5 ? "3 3" : "0"
                            }
                          />
                        );
                      })}
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {nilaiData.length === 0 ? (
        <div className="w-full p-10 space-y-4">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
        </div>
      ) : (
        <div className="w-full p-10 space-y-4">
          <Table className="table-auto w-full">
            <TableCaption>
              Tabel nilai{" "}
              {mapel.find((item) => item.$id === matapelajaran)?.name || ""}{" "}
              kelas {dataUser.kelas}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableCell>Nama Siswa</TableCell>
                {nilaiData[0].name?.map((item: any, index: any) => (
                  <TableCell key={index} align="center">
                    {item}
                  </TableCell>
                ))}
                <TableCell align="center">Rata Rata</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nilaiData.map((item) => (
                <TableRow key={item.$id}>
                  {!hiddenColumns.namaSiswa && (
                    <TableCell className="font-medium">
                      {item.user ? item.user.name : "User Not Found"}
                    </TableCell>
                  )}

                  {item.value?.map((value: any, index: any) => (
                    <TableCell key={index} align="center">
                      {value}
                    </TableCell>
                  ))}
                  <TableCell className="font-medium" align="center">
                    {!hiddenColumns.rataRata && (
                      <>
                        {item.value
                          ?.reduce((total: any, value: any, index: any) => {
                            return (
                              total + value * (item.persentase?.[index] || 0)
                            );
                          }, 0)
                          .toFixed(1)}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Leger;
