import Sidebar from "@/components/ui/Sidebar";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { AccordionContent } from "@radix-ui/react-accordion";
import React, { useEffect, useState, useRef } from "react";
import { getUrl, postUrl } from "../utils";
import { useToast } from "@/components/ui/use-toast"



const Inventory: React.FC = () => {
  const [isSmall, setisSmall] = useState<boolean>(false);
  const [components, setComponents] = useState<{ id: number, name: string; quantity: number }[]>([]);
  const [machine, setMachine] = useState<{ id: number, name: string }[]>([]);
  const [work, setWork] = useState<{ id: number, name: string }[]>([]);
  const [nameinput, setNameInput] = useState<{ name: string, qty: number }>({ name: "", qty: 0 })
  const [edited, setEdited] = useState(false);
  const [editedMach, setEditedMach] = useState(false);
  const [editedWorkstation, setEditedWorkstation] = useState(false);
  const fetchedComponents = useRef(false);
  const fetchedMachines = useRef(false);
  const fetchedWorkstations = useRef(false);
  const { toast } = useToast();


  window.addEventListener("resize", () => {
    setisSmall(window.innerWidth <= 1000);
  });

  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
    getUrl("/inventory/components/all", {}).then(response => {
      if (fetchedComponents.current == false) {
        let newComponents: { id: number, name: string; quantity: number }[] = [];

        response.data.components.forEach((component: any) => {
          newComponents.push({ id: component.id, name: component.name, quantity: component.total })
        });
        setComponents(newComponents);
        fetchedComponents.current = true;
      }
    })
    getUrl("/inventory/machines/all", {}).then(response => {
      if (!fetchedMachines.current) {
        let newMachines: { id: number, name: string }[] = [];

        response.data.machines.forEach((machines: any) => {
          newMachines.push({ id: machines.id, name: machines.name })
        })
        console.log(newMachines)
        setMachine(newMachines);
      }
    })
    getUrl("/inventory/workstations/all", {}).then(response => {
      if (!fetchedWorkstations.current) {
        let newWorkstations: { id: number, name: string }[] = [];

        response.data.workstations.forEach((workstation: any) => {
          newWorkstations.push({ id: workstation.id, name: workstation.name })
        })
        console.log(newWorkstations)
        setWork(newWorkstations);
      }
    })
  }, []);


  const addComponent = (): undefined => {
    if (components.length > 0) {
      if (components[components.length - 1].name != "") {
        setComponents([...components, { id: components[components.length - 1].id + 1, name: "", quantity: 0 }]);
      }
    } else {
      setComponents([...components, { id: 0, name: "", quantity: 0 }]);
    }
  };
  const addMachine = () => {
    if (machine.length > 0) {
      if (machine[machine.length - 1].name != "") {
        setMachine([...machine, { id: machine[machine.length - 1].id + 1, name: "" }]);
      }
    } else {
      setMachine([...machine, { id: 0, name: "" }]);
    }
  };
  const addWork = () => {
    if (work.length > 0) {
      if (work[work.length - 1].name != "") {
        setWork([...work, { id: work[work.length - 1].id + 1, name: "" }]);
      }
    } else {
      setWork([...work, { id: 0, name: "" }]);
    }
  }

  const removeComponent = (index: number, id: number) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1);
    postUrl('/inventory/components/delete', { id: id })
    setComponents(updatedComponents);
  };
  const removeMachine = (index: number, id: number) => {
    const updatedMachines = [...machine];
    updatedMachines.splice(index, 1);
    postUrl('/inventory/machines/delete', { id: id })
    setMachine(updatedMachines);
  };
  const removeWork = (index: number, id: number) => {
    const updatedWorkstations = [...work];
    updatedWorkstations.splice(index, 1);
    postUrl('/inventory/workstations/delete', { id: id })
    setWork(updatedWorkstations);
  };

  const handleEditComponent = (index: number, key: keyof typeof components[0], value: string | number) => {
    const updatedComponents = [...components];
    (updatedComponents[index] as { [k in keyof typeof components[0]]: string | number })[key] = value;
    setComponents(updatedComponents);
  };
  const handleEditMachine = (index: number, key: keyof typeof machine[0], value: string | number) => {
    const updatedMachine = [...machine];
    (updatedMachine[index] as { [k in keyof typeof machine[0]]: string | number })[key] = value;
    setMachine(updatedMachine);
  };
  const handleEditWork = (index: number, key: keyof typeof components[0], value: string | number) => {
    const updatedWork = [...work];
    (updatedWork[index] as { [k in keyof typeof components[0]]: string | number })[key] = value;
    setWork(updatedWork);
  };


  return (
    <div className={`hover:rounded-lg ${isSmall ? "" : "flex"} max-h-screen`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Card className="info-card flex flex-col flex-1">
          <CardTitle className="m-2 ">
            <span>Inventory</span>
          </CardTitle>
          <CardDescription className="m-2">List of Available Resources</CardDescription>
          <CardContent className="flex-1">
            <Accordion type="single" collapsible>
              <AccordionItem value="components">
                <AccordionTrigger>
                  <CardTitle>Components</CardTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <Table >

                    <TableHeader>
                      <TableRow>
                        <TableHead>Component Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {components.map((component, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              type="text"
                              value={component.name}
                              onChange={(e) => {
                                setEdited(true);
                                setNameInput({
                                  name: e.target.value,
                                  qty: nameinput.qty
                                }); handleEditComponent(index, "name", e.target.value)
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={component.quantity}
                              onChange={(e) => {
                                setNameInput({
                                  name: nameinput.name,
                                  qty: parseInt(e.target.value)
                                }); handleEditComponent(index, "quantity", parseInt(e.target.value))
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Button className="bg-red-500" onClick={() => removeComponent(index, components[index].id)}>Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableCell>
                        <Button className={`bg-blue-400 hover:bg-blue-600 mr-2 ${!edited ? 'hidden' : ''}`} disabled={!edited ? true : false} onClick={() => {
                          components.forEach(component => {
                            postUrl("/inventory/components/update", {
                              id: component.id,
                              name: component.name,
                              total: component.quantity
                            })
                            toast({
                              title: "Changes saved successfully",
                              variant: "success"
                            })
                          })
                        }}>Save Changes</Button>
                        <Button className="" onClick={() => {
                          setEdited(true); addComponent();
                        }}>+ Add Component</Button>
                      </TableCell>
                    </TableBody>
                  </Table>

                </AccordionContent>
              </AccordionItem>



              <AccordionItem value="machines">
                <AccordionTrigger>
                  <CardTitle>Machines</CardTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <Table >

                    <TableHeader>
                      <TableRow>
                        <TableHead>Machines Name</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {machine.map((machine, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              type="text"
                              value={machine.name}
                              onChange={(e) => handleEditMachine(index, "name", e.target.value)}
                            />
                          </TableCell>

                          <TableCell>
                            <Button className="bg-red-500" onClick={() => removeMachine(index, machine.id)}>Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableCell>
                        <Button className={`bg-blue-400 hover:bg-blue-600 mr-2 ${!editedMach ? 'hidden' : ''}`} disabled={!editedMach ? true : false} onClick={() => {
                          setEditedMach(true);
                          machine.forEach(machine => {
                            postUrl("/inventory/machines/create", {
                              id: machine.id,
                              name: machine.name,
                            })
                            toast({
                              title: "Changes saved successfully",
                              variant: "success"
                            })
                          })
                        }}>Save Changes</Button>
                        <Button className="" onClick={() => {
                          setEditedMach(true); addMachine()
                        }}>+ Add Component</Button>
                      </TableCell>
                    </TableBody>
                  </Table>

                </AccordionContent>
              </AccordionItem>



              <AccordionItem value="workstation">
                <AccordionTrigger>
                  <CardTitle>Workstation</CardTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <Table >

                    <TableHeader>
                      <TableRow>
                        <TableHead>Workstation Name</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {work.map((workstation, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              type="text"
                              value={workstation.name}
                              onChange={(e) => handleEditWork(index, "name", e.target.value)}
                            />
                          </TableCell>

                          <TableCell>
                            <Button className="bg-red-500" onClick={() => removeWork(index, workstation.id)}>Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableCell>
                        <Button className={`bg-blue-400 hover:bg-blue-600 mr-2 ${!editedWorkstation ? 'hidden' : ''}`} disabled={!editedWorkstation ? true : false} onClick={() => {
                          setEditedWorkstation(true);
                          work.forEach(workstation => {
                            postUrl("/inventory/workstations/update", {
                              id: workstation.id,
                              name: workstation.name,
                            })
                            toast({
                              title: "Changes saved successfully",
                              variant: "success"
                            })
                          })
                        }}>Save Changes</Button>
                        <Button className="" onClick={() => {
                          setEditedWorkstation(true); addWork();
                        }}>+ Add Workstation</Button>
                      </TableCell>

                    </TableBody>
                  </Table>

                </AccordionContent>
              </AccordionItem>
            </Accordion>


          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;

