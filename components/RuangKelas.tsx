"use client";
import React, { useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
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
import { readMatapelajaranSiswa } from "@/lib/actions/matapelajaran.actions";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Skeleton } from "./ui/skeleton";
import { getLoggedInUser } from "@/lib/actions/user.action";

const RuangKelas = () => {
  const [dataUser, setDataUser] = useState<any>(null);
  const [dataMataPelajaran, setDataMataPelajaran] = useState<any[]>([]);
  const [openCollapsibles, setOpenCollapsibles] = useState<string[]>([]);

  const sanitizeEmbedCode = (code: string) => {
    const cleanedCode = code
      .replace(/width="\d*"/g, "")
      .replace(/height="\d*"/g, "");
    return DOMPurify.sanitize(cleanedCode, { ADD_TAGS: ["iframe"] });
  };

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



  const toggleCollapsible = (id: string) => {
    setOpenCollapsibles((prev) =>
      prev.includes(id) ? prev.filter((collId) => collId !== id) : [...prev, id]
    );
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
          <div className="grid md:grid-cols-2  gap-4">
            {dataMataPelajaran.map((item) => (
              <Card key={item.$id} className={cn("p-4 h-min")}>
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
                        </Suspense>
                        {item.subMapel.map((subItem: any) => (
                          <div
                            key={subItem.$id}
                            className="flex justify-between w-full items-stretch"
                          >
                            <div className="flex flex-col gap-4">
                              <Link
                                href={`/kelas/${subItem.name}`}
                                className="flex items-center"
                              >
                                <h4>
                                  {subItem.name} {subItem.selesai ? "🫰" : ""}
                                </h4>
                              </Link>
                              {subItem.link_buku && (
                                <Link href={subItem.link_buku}>
                                  <Button>Buku</Button>
                                </Link>
                              )}
                              {subItem.link_figma && (
                                <Link href={subItem.link_figma}>
                                  <Button>Button</Button>
                                </Link>
                              )}
                            </div>
                            <div className="justify-end hidden lg:block">
                              {subItem.embed_code && (
                                <>
                                  <div
                                    className="aspect-ratio w-full overflow-hidden m-auto items-end"
                                    dangerouslySetInnerHTML={{
                                      __html: sanitizeEmbedCode(
                                        subItem.embed_code
                                      ),
                                    }}
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
