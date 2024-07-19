"use client";
import React, { useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { readMatapelajaran } from "@/lib/actions/matapelajaran.actions";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Skeleton } from "./ui/skeleton";

const CreateSubmateri = React.lazy(() => import('./CreateSubmateri'));

const RuangKelas = () => {
  const [dataMataPelajaran, setDataMataPelajaran] = useState<any[]>([]);
  const [openCollapsibles, setOpenCollapsibles] = useState<string[]>([]);
  const [loadingEmbeds, setLoadingEmbeds] = useState<string[]>([]);

  const sanitizeEmbedCode = (code: string) => {
    const cleanedCode = code
      .replace(/width="\d*"/g, "")
      .replace(/height="\d*"/g, "");
    return DOMPurify.sanitize(cleanedCode, { ADD_TAGS: ["iframe"] });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readMatapelajaran();
        setDataMataPelajaran(response.documents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const toggleCollapsible = (id: string) => {
    setOpenCollapsibles((prev) =>
      prev.includes(id) ? prev.filter((collId) => collId !== id) : [...prev, id]
    );
  };

  const handleEmbedLoad = (id: string) => {
    setLoadingEmbeds((prev) => prev.filter((embedId) => embedId !== id));
  };

  return (
    <div>
      <section>
        <div className="w-full">
          <Card className={cn("w-full")}>
            <CardHeader>
              <CardTitle>Kelas</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <div className="grid grid-cols-2 gap-4">
                {dataMataPelajaran.map((item) => (
                  <Card key={item.id} className={cn("p-4 h-min")}>
                    <div className="p-4 rounded-md">
                      <Collapsible
                        key={item.id}
                        open={openCollapsibles.includes(item.$id)}
                        onOpenChange={() => toggleCollapsible(item.$id)}
                      >
                        <CollapsibleTrigger className="flex justify-between items-center">
                          <h3>{item.name}</h3>
                          <CaretSortIcon />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="space-y-2">
                            <Suspense fallback={<div>Loading...</div>}>
                              <CreateSubmateri id={item.$id} />
                            </Suspense>
                            {item.subMapel.map((subItem: any) => (
                              <div
                                key={subItem.$id}
                                className="flex justify-between w-full items-stretch"
                              >
                                <div className="flex flex-col gap-4">
                                  <h4>
                                    {subItem.name}{" "}
                                    {subItem.selesai ? "🫰" : "👎"}
                                  </h4>
                                  {subItem.link_buku && (
                                    <Link href={subItem.link_buku}>
                                      <Button>Buku</Button>
                                    </Link>
                                  )}
                                  {subItem.link_figma && (
                                    <Link href={subItem.link_figma}>
                                      <Button>Figma</Button>
                                    </Link>
                                  )}
                                </div>
                                <div className="justify-end">
                                  {subItem.embed_code && (
                                    <>
                                      {loadingEmbeds.includes(subItem.id) && (
                                        <>
                                          <Skeleton className="w-[300px] h-[150px]" />
                                          loding ya
                                          <Skeleton className="w-[300px] h-[150px]" />
                                        </>
                                      )}
                                      <div
                                        className="overflow-hidden m-auto items-end"
                                        dangerouslySetInnerHTML={{
                                          __html: sanitizeEmbedCode(
                                            subItem.embed_code
                                          ),
                                        }}
                                        onLoad={() =>
                                          handleEmbedLoad(subItem.id)
                                        }
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RuangKelas;
