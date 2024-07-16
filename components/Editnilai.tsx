import React, { useEffect, useState } from 'react'
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Label } from './ui/label'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { useMediaQuery } from 'usehooks-ts'
import { getaNilai, getNilai } from '@/lib/actions/nilai.actions'

  export function DrawerDialog(){
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
   
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Editnilai />
          </DialogContent>
        </Dialog>
      )
    }
   
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <Editnilai className="px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

const Editnilai = ({ className }: React.ComponentProps<"form">) => {
    const [nilaiData, setNilaiData] = useState<any[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getaNilai("undefined6692bf5d0007c579b778");
          setNilaiData(data.documents); // Update state with fetched data
          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle errors appropriately (e.g., display an error message to the user)
        }
      };
      fetchData(); // Call the function to fetch data
    }, []); 
    return (
        <form className={cn("grid items-start gap-4", className)}>
          <Table>
        <TableCaption>ggwp</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">user</TableHead>
            {nilaiData[0]?.name?.map((item: any, index: any) => (
              <TableHead key={index}>
                {item}
                </TableHead>
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
        </form>
      )  

  
}
