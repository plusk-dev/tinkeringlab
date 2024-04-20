import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import mainLogo from '../images/tinker.png'
import { toast } from '@/components/ui/use-toast'

export default function Signup() {
  const [email, setEmail] = useState()
  return <>
    <main className="w-screen h-screen flex items-center justify-center">
      <Card className=" info-card px-4 m-4" >
        <div className='flex justify-center'>
          <img src={mainLogo} className="h-1/3" />
        </div>
        <CardTitle className='w-full text-center font-bold mb-4 mt-3'>Sign Up</CardTitle>
        <div className='flex gap-1 ml-1'>
          <Input placeholder="Enter Name" className="flex-1"></Input>
          <div className="flex-1 mr-1">
            <Select >
              <SelectTrigger>
                <SelectValue placeholder="Designation"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intern">Intern</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>


          </div>

        </div>
        <div className="mt-2 flex flex-col gap-2">
          <div>
            <CardDescription className=' flex justify-between'>Email
              <GoogleLogin onSuccess={(e: any) => setEmail((jwtDecode(JSON.stringify(e.credential)) as any).email)} size='small' /></CardDescription>
            <Input disabled type='text' placeholder='Organization Email (Filled from Google)' value={email} className='mt-2' />

          </div>
          <div>

            <CardDescription>Professor in Charge:</CardDescription>
            <Input type='text' className="w-full"></Input>
          </div>
          <div>
            <CardDescription>Remarks:</CardDescription>
            <Textarea className='w-full' />
          </div>

          <Button className='mb-4' onClick={e => {
            toast({
              variant: "success",
              title: "Request sent!",
            })
          }}>Sign Up</Button>
        </div>
      </Card>
    </main>
  </>
}