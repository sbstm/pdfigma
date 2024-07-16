'use client';
import { readMatapelajaran } from '@/lib/actions/matapelajaran.actions';
import { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { getLoggedInUser } from '@/lib/actions/user.action';
import { Button } from './ui/button';
import { updateLabel } from '@/lib/actions/user.manage';
import { set } from 'date-fns';

const Adminsetup = () => {
    const [mapel, setMapel] = useState<MapelParams[]>([]);
    const [idupdate, setIdupdate] = useState('');
    const [user, setUser] = useState<UserParams[]>([]);

    useEffect(() => {
        const init = async () => {
        const data = await readMatapelajaran();
        setMapel(data);
        const datauser = await getLoggedInUser()
        console.log(datauser.userId);
        datauser.role = 'guru' 
        setUser(datauser);
        setIdupdate(datauser.userId);
    };
    init();
}, []);

      const onSubmit = async () => {
        updateLabel(idupdate);
      }
    
  return (
    <div>
        <Select>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Mata Pelajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select</SelectLabel>
                          {mapel.map((item) => (
                            <SelectItem  value={item.$id ?? ""}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button onClick={onSubmit}>Submit</Button>
    </div>
  )
}

export default Adminsetup