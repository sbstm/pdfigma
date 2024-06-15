import ReadMapel from '@/components/ReadMapel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CollapsibleTrigger , Collapsible, CollapsibleContent} from '@/components/ui/collapsible'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { readMatapelajaran } from '@/lib/actions/matapelajaran.actions'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import React from 'react'

const page = async() => {
    
    return (
    <div>
     
<ReadMapel />
    </div>
  )
}

export default page