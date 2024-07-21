"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { selectSubMapel } from "@/lib/actions/submapel.actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";

const page = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = React.useState<any[]>([]);

  const editname = params.slug.replace(/%20/g, " ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await selectSubMapel(editname);
        setData(response.documents);
        console.log(response.documents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div key={editname}>
      {data.map((item) => (
        <>
          <Label key={item.$id}>{item.name}</Label>
          <Switch value={item.selesai} />
          <Accordion type="multiple">
            {item.activity.map((activity: any) => (
              <AccordionItem value={activity.$id} key={activity.$id}>
                <AccordionTrigger>{activity.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2">
                    <div className="">
                      <p>{activity.materi}</p>
                      <Switch value={activity.selesai} />
                    </div>
                    <div className="">
                      <Calendar
                        mode="range"
                        selected={{
                          from: new Date(),
                          to: activity.dateline,
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      ))}
    </div>
  );
};

export default page;
