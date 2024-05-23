import Sidebar from '@/components/ui/Sidebar'
import React, { useEffect, useRef, useState } from 'react'
import { getTokenFromStorage, verify_admin_token, deleteTokenFromStorage, getUrl, postUrl } from "@/utils"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { Card, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { jwtDecode } from 'jwt-decode';
import { Input } from '@/components/ui/input';

export default function Hierarchy() {
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>();
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    getUrl("/users/all", {}).then(response => setUsers(JSON.parse(response.data)));
  }, [])

  const filteredUsers = users?.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.student_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Card className="info-card w-full flex-1 p-6">
          <CardTitle className='p-2'>Hierarchy Management</CardTitle>
          <span className="text-small text-gray-400">This field can be used to search across Emails, Student IDs and Names</span>
          <Input
            type="text"
            placeholder="Search Users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 border rounded w-1/3"
          />
          <Table>
            <TableHeader>
              <TableRow className='text-bold'>
                <TableCell>Database ID</TableCell>
                <TableCell>Created At (YYYY-MM-DD)</TableCell>
                <TableCell>E-Mail</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Hierarchy</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.created_at.split(".")[0]}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.student_id != undefined ? user.student_id : "User is not a student"}</TableCell>
                  <TableCell>
                    <Select
                      disabled={(jwtDecode(JSON.stringify(getTokenFromStorage())) as any).email == user.email}
                      onValueChange={value => {
                        if ((user.admin == true && value == "admin") || (user.admin == undefined && value == "user")) {
                          toast({
                            title: "User is already at the same level.",
                            variant: "destructive"
                          })
                        } else {
                          postUrl("/change_hierarchy", {
                            user_id: user.id,
                            user_type: user.admin ? "admin" : "user",
                            change_to: value
                          }).then(response => {
                            toast({
                              title: "Changing....",
                              variant: "default"
                            })
                            window.location.reload();
                            toast({
                              title: "Changed",
                              variant: "success"
                            })
                          })
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={user.admin ? "Admin" : "User"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='user'>User</SelectItem>
                          <SelectItem value='admin'>Admin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
