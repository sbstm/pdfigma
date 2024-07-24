"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/lib/actions/user.action";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { readMatapelajaranSiswa } from "@/lib/actions/matapelajaran.actions";
import { readSubMapel } from "@/lib/actions/submapel.actions";
import { readActivity } from "@/lib/actions/activity.actions";

const CreateActivity = () => {
  const [dataMataPelajaran, setDataMataPelajaran] = useState<any[]>([]);
  const [selectMataPelajaran, setSelectMataPelajaran] = useState<any[]>([]);
  const [subMapelOptions, setSubMapelOptions] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any>(null);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoggedInUser();
        setDataUser(data);
        const response = await readMatapelajaranSiswa(data.kelas);
        setDataMataPelajaran(response.documents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubMapelChange = (mapelid: any) => {
    setSelectMataPelajaran(mapelid);
    const selectedMapelObj = dataMataPelajaran.find(
      (item) => item.$id.toString() === mapelid
    );
    setSubMapelOptions(selectedMapelObj ? selectedMapelObj.subMapel : []);
  };
  const handleActivity = async (subMapelid: any) => {
    try {
      const data = await readActivity(subMapelid);
      setActivityData(data.documents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-3">
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
        <Select onValueChange={handleActivity}>
          <SelectTrigger className="">
            <SelectValue placeholder="Sub Mata Pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {subMapelOptions.map((subItem) => (
                <SelectItem value={subItem.$id ?? ""}>
                  {subItem.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      {activityData.map((item) => (
        <div key={item.$id}>
          <div>{item.name}</div>
          <div>{item.materi}</div>
          <div>{item.jenis}</div>
          <div>{item.dateline}</div>
        </div>
      ))}
    </div>
  );
};

export default CreateActivity;
