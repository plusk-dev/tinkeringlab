import React, { useEffect, useState, useRef } from "react"
import Sidebar from "@/components/ui/Sidebar"
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getUrl, postUrl } from "@/utils"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertOctagon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { getTokenFromStorage, verify_admin_token, deleteTokenFromStorage } from "@/utils"

export default function Inventory() {
    const [components, setComponents] = useState<{ id: number, name: string, total: number }[]>([{ id: 1, name: "", total: 0 }])
    const [machines, setMachines] = useState<{ id: number, name: string }[]>([{ id: 1, name: "" }])
    const [work, setWork] = useState<{ id: number, name: string }[]>([{ id: 1, name: "" }])
    const [editingComp, seteditingComp] = useState<boolean>(false);
    const [editingMach, seteditingMach] = useState<boolean>(false);
    const [editingWork, setEditingWork] = useState<boolean>(false);
    const [saveComponent, setSaveComponent] = useState<boolean>(false);
    const [saveMachine, setSaveMachine] = useState<boolean>(true);
    const [saveWork, setSaveWork] = useState<boolean>(true);
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

    useEffect(() => {
        getUrl("/inventory/components/all", {}).then(response => {
            let newComponents: { id: number, name: string; total: number }[] = [...response.data.components];
            setComponents(newComponents);
        })
        getUrl("/inventory/machines/all", {}).then(response => {
            let newMachines: { id: number, name: string }[] = [...response.data.machines];
            setMachines(newMachines);
        })
        getUrl("/inventory/workstations/all", {}).then(response => {
            let newWork: { id: number, name: string }[] = [...response.data.workstations];
            setWork(newWork);
        })
        getUrl("/requests/all",{}).then((response)=>{
            console.log(JSON.parse(response.data))
        })
    }, [])

    const handleNameChange = (index: number, value: string) => {
        const newArray: { id: number, name: string, total: number }[] = [...components];
        newArray[index].name = value;
        setComponents(newArray);
    }
    const handleNameMachine = (index: number, value: string) => {
        const newArray: { id: number, name: string }[] = [...machines];
        newArray[index].name = value;
        setMachines(newArray);
    }
    const handleNameWork = (index: number, value: string) => {
        const newArray: { id: number, name: string }[] = [...work];
        newArray[index].name = value;
        setWork(newArray);
    }

    const handletotalChange = (index: number, value: number) => {
        const newArray: { id: number, name: string, total: number }[] = [...components];
        newArray[index].total = value;
        setComponents(newArray);
    }

    const handleCompRemove = (id: number, index: number) => {
        if (components.length === 1) {
            setComponents([{ id: 1, name: "", total: 0 }])

        } else {
            const newArray = [...components]
            newArray.splice(index, 1)
            setComponents(newArray)
        }
        postUrl("/inventory/components/delete", { id: id })
    }
    const handleMachRemove = (id: number, index: number) => {
        if (machines.length === 1) {
            setMachines([{ id: 1, name: "" }])
        } else {
            const newArray = [...machines]
            newArray.splice(index, 1)
            setMachines(newArray)
        }
        postUrl("/inventory/machines/delete", { id: id })
    }
    const handleWorkRemove = (id: number, index: number) => {
        if (work.length === 1) {
            setWork([{ id: 1, name: "" }])
        } else {
            const newArray = [...work]
            newArray.splice(index, 1)
            setWork(newArray)
        }
        postUrl("/inventory/workstations/delete", { id: id })
    }

    const addComponent = () => {
        postUrl("/inventory/components/create", {
            name: "",
            total: 0

        })
        const newArray: { id: number, name: string, total: number }[] = [...components]
        newArray.push({ id: components.length + 1, name: "", total: 0 })
        setComponents(newArray);
    }
    const addMachine = () => {
        postUrl("/inventory/machines/create", {
            name: ""
        })
        const newArray: { id: number, name: string }[] = [...machines]
        newArray.push({ id: machines.length + 1, name: "" })
        setMachines(newArray)
    }
    const addWork = () => {
        postUrl("/inventory/workstations/create", {
            name: ""
        })
        const newArray: { id: number, name: string }[] = [...work]
        newArray.push({ id: work.length + 1, name: "" })
        setWork(newArray)
    }


    return <>
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full ">
                <Card className="info-card  flex-1 w-full ">
                    <CardTitle className="m-2 ">
                        <span>Inventory</span>
                    </CardTitle>

                    <CardDescription className="m-2 mb-5">List of Available Resources</CardDescription>

                    <CardContent>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="components">
                                <div className="flex justify-between">
                                    <AccordionTrigger>
                                        <CardTitle>Components</CardTitle>
                                    </AccordionTrigger>
                                    <div className="flex items-center">
                                        <Button onClick={() => seteditingComp(!editingComp)}>{editingComp ? "Exit Edit Mode" : "Edit Mode"}</Button>

                                    </div>

                                </div>

                                <AccordionContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow >
                                                <TableHead>Name</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {components.map((component, index) => {
                                                return !editingComp ?
                                                    <TableRow key={index}>
                                                        <TableCell>{component.name}</TableCell>
                                                        <TableCell>{component.total}</TableCell>
                                                    </TableRow> :
                                                    <TableRow key={index} >
                                                        <TableCell className="w-1/3"><Input type="text" value={component.name} onChange={(e) => { setSaveComponent(false); handleNameChange(index, e.target.value) }} /></TableCell>
                                                        <TableCell className="w-1/3 "><Input type="number" value={component.total} onChange={(e) => { setSaveComponent(false); handletotalChange(index, parseInt(e.target.value)) }} /></TableCell>
                                                        <TableCell><Button onClick={() => { setSaveComponent(false); handleCompRemove(component.id, index) }}>Remove</Button></TableCell>
                                                    </TableRow>

                                            })}

                                            <TableRow className={`${editingComp ? "" : "hidden"}`}>
                                                <TableCell className="flex gap-1"><Button onClick={() => { setSaveComponent(false); addComponent() }}>+Add New</Button>
                                                    <Button className="bg-blue-500" onClick={() => {
                                                        setSaveComponent(true)
                                                        let success: boolean = true;
                                                        components.forEach(component => {
                                                            postUrl("/inventory/components/update", {
                                                                id: component.id,
                                                                name: component.name,
                                                                total: component.total
                                                            }).then(response => success = success && (response.status == 200))

                                                        }
                                                        )
                                                        if (success) {
                                                            toast({
                                                                title: "Changes saved successfully",
                                                                variant: "success"
                                                            })
                                                        } else {
                                                            toast({
                                                                title: "Changes not saved",
                                                                variant: "destructive"
                                                            })
                                                        }

                                                    }} >Save</Button>

                                                </TableCell>
                                                <TableCell className={`${saveComponent ? "hidden" : ""}`}>
                                                    <Alert className="bg-red-500 h-10 flex items-center">
                                                        <AlertTitle className="flex items-center gap-1 justify-center"><AlertOctagon />Remember to save changes before exiting</AlertTitle>
                                                    </Alert>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="machines">
                                <div className="flex justify-between">
                                    <AccordionTrigger>
                                        <CardTitle>Training Session Titles</CardTitle>
                                    </AccordionTrigger>
                                    <div className="flex items-center">
                                        <Button onClick={() => seteditingMach(!editingMach)}>{editingMach ? "Exit Edit Mode" : "Edit Mode"}</Button>
                                    </div>
                                </div>

                                <AccordionContent>
                                    <Table>

                                        <TableHeader>
                                            <TableRow >
                                                <TableHead>Name</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {machines.map((machine, index) => {
                                                return !editingMach ?
                                                    <TableRow key={index}><TableCell>{machine.name}</TableCell></TableRow>
                                                    :
                                                    <TableRow key={index}>
                                                        <TableCell ><Input value={machine.name} onChange={(e) => { setSaveMachine(false); handleNameMachine(index, e.target.value) }}></Input></TableCell>
                                                        <TableCell><Button onClick={() => { setSaveMachine(false); handleMachRemove(machine.id, index) }}>Remove</Button>

                                                        </TableCell>
                                                    </TableRow>

                                            })}


                                            <TableRow>
                                                <TableCell className="flex gap-1"><Button className={`${editingMach ? "" : "hidden"}`} onClick={() => { setSaveMachine(false); addMachine() }}>+Add Machine</Button>
                                                    <Button className={`bg-blue-500 ${editingMach ? "" : "hidden"}`} onClick={() => {
                                                        setSaveMachine(true);
                                                        machines.forEach(machine => {
                                                            let success: boolean = true;
                                                            postUrl("/inventory/machines/update", {
                                                                id: machine.id,
                                                                name: machine.name,

                                                            }).then(response=>success=success && (response.status===200))
                                                            if (success) {
                                                                toast({
                                                                    title: "Changes saved successfully",
                                                                    variant: "success"
                                                                })
                                                            } else {
                                                                toast({
                                                                    title: "Changes not saved",
                                                                    variant: "destructive"
                                                                })
                                                            }
                                                        }
                                                        )

                                                    }} >Save</Button>
                                                </TableCell>
                                                <TableCell className={`${saveMachine ? "hidden" : ""}`}>
                                                    <Alert className="bg-red-500 h-10 flex items-center ">
                                                        <AlertTitle className="flex items-center gap-1 justify-center"><AlertOctagon />Save changes before exiting</AlertTitle>
                                                    </Alert>
                                                </TableCell>
                                            </TableRow>

                                        </TableBody>
                                    </Table>

                                </AccordionContent>

                            </AccordionItem>


                            <AccordionItem value="workstation">
                                <div className="flex justify-between">
                                    <AccordionTrigger>
                                        <CardTitle>Workstations</CardTitle>
                                    </AccordionTrigger>
                                    <div className="flex items-center">
                                        <Button onClick={() => { setEditingWork(!editingWork) }}>{editingWork ? "Exit Edit Mode" : "Edit Mode"}</Button>
                                    </div>
                                </div>

                                <AccordionContent>
                                    <Table>

                                        <TableHeader>
                                            <TableRow >
                                                <TableHead>Name</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {work.map((work, index) => {
                                                return !editingWork ?
                                                    <TableRow key={index}><TableCell>{work.name}</TableCell></TableRow>
                                                    :
                                                    <TableRow key={index}>
                                                        <TableCell ><Input value={work.name} onChange={(e) => { setSaveWork(false); handleNameWork(index, e.target.value) }}></Input></TableCell>
                                                        <TableCell><Button onClick={() => { setSaveWork(false); handleWorkRemove(work.id, index) }}>Remove</Button>

                                                        </TableCell>
                                                    </TableRow>

                                            })}


                                            <TableRow>
                                                <TableCell className="flex gap-1"><Button className={`${editingWork ? "" : "hidden"}`} onClick={() => { setSaveWork(false); addWork() }}>+Add Workstation</Button>
                                                    <Button className={`bg-blue-500 ${editingWork ? "" : "hidden"}`} onClick={() => {
                                                        setSaveWork(true);
                                                        work.forEach(work => {
                                                            let success:boolean=true;
                                                            postUrl("/inventory/workstations/update", {
                                                                id: work.id,
                                                                name: work.name,

                                                            }).then(response=>success=success && (response.status===200))
                                                            if (success) {
                                                                toast({
                                                                    title: "Changes saved successfully",
                                                                    variant: "success"
                                                                })
                                                            } else {
                                                                toast({
                                                                    title: "Changes not saved",
                                                                    variant: "destructive"
                                                                })
                                                            }
                                                        }
                                                        )

                                                    }} >Save</Button>
                                                </TableCell>
                                                <TableCell className={`${saveWork ? "hidden" : ""}`}>
                                                    <Alert className="bg-red-500 h-10 flex items-center ">
                                                        <AlertTitle className="flex items-center gap-1 justify-center"><AlertOctagon />Save changes before exiting</AlertTitle>
                                                    </Alert>
                                                </TableCell>
                                            </TableRow>

                                        </TableBody>
                                    </Table>

                                </AccordionContent>

                            </AccordionItem>


                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div >
    </>
}