import CalenderTask from '@/components/CalenderTask'
import Tabeluser from '@/components/Tabeluser'
import React from 'react'

const Dashboard = () => {
  return (
    <div className="w-full">
      <Tabeluser />
      <CalenderTask />
    </div>
  )
}

export default Dashboard
