import Sidebar from '@/components/ui/Sidebar'
import React, { useEffect,useRef  } from 'react'
import { getTokenFromStorage, verify_admin_token, deleteTokenFromStorage } from "@/utils"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { Card, CardTitle } from '@/components/ui/card';


export default function Hierarchy(){
  const { toast } = useToast();
  const navigate = useNavigate()
  const authenticated = useRef(false);


  useEffect(() => {
    if (!authenticated.current) {
        verify_admin_token(getTokenFromStorage()).then(response => {
            if (response.data.admin != true) {
                toast({
                    title: "You are not an admin",
                    variant: "destructive"
                })
                navigate("/login");
                deleteTokenFromStorage();
            }
        }).catch(error => {
            let toastMessage: String = "";
            toastMessage = error.response.data.error;
            toast({
                title: `${toastMessage}`,
                variant: "destructive"
            })
            navigate("/login");
            deleteTokenFromStorage();
        })
        authenticated.current = true;
    }
  }, [])


  return <>
  <div className="flex">
    <Sidebar/>
    <div className="flex flex-col w-full">
      <Card className="info-card w-full flex-1">
        <CardTitle className='p-2'>Hierarchy Management</CardTitle>       
      </Card>
    </div>

  </div>
  </>
}