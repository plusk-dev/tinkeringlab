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
  const [machine, setMachine] = useState<{ name: string }[]>([]);
  const [work, setWork] = useState<{ name: string }[]>([]);
  const [nameinput, setNameInput] = useState<{ name: string, qty: number }>({ name: "", qty: 0 })
  const [edited, setEdited] = useState(false);
  const fetched = useRef(false);
  const { toast } = useToast();


  window.addEventListener("resize", () => {
    setisSmall(window.innerWidth <= 1000);
  });

  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
    getUrl("/inventory/components/all", {}).then(response => {
      if (fetched.current == false) {
        let newComponents: { id: number, name: string; quantity: number }[] = [];

        response.data.components.forEach((component: any) => {
          newComponents.push({ id: component.id, name: component.name, quantity: component.total })
        });
        setComponents(newComponents);
        fetched.current = true;
      }
    })
  }, []);


  const addComponent = (name: string, total: number): undefined => {
    console.log(components)
    if (name != "") {
      postUrl("/inventory/components/create", {
        name: name,
        total: total
      })
    }
    if (components.length > 0) {
      if (components[components.length - 1].name != "") {
        setComponents([...components, { id: components[components.length - 1].id + 1, name: "", quantity: 0 }]);
      }
    } else {
      setComponents([...components, { id: 0, name: "", quantity: 0 }]);
    }
  };
  const addMachine = () => {
    setMachine([...machine, { name: "" }]);
  };
  const addWork = () => {
    setWork([...work, { name: "" }])
  }

  const removeComponent = (index: number, id: number) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1);
    postUrl('/inventory/components/delete', { id: id })
    setComponents(updatedComponents);
  };
  const removeMachine = (index: number) => {
    const updatedComponents = [...machine];
    updatedComponents.splice(index, 1);
    setMachine(updatedComponents);
  };
  const removeWork = (index: number) => {
    const updatedWork = [...work];
    updatedWork.splice(index, 1);
    setMachine(updatedWork);
  };

  const handleEditComponent = (index: number, key: keyof typeof components[0], value: string | number) => {
    const updatedComponents = [...components];
    (updatedComponents[index] as { [k in keyof typeof components[0]]: string | number })[key] = value;
    setComponents(updatedComponents);
  };
  const handleEditMachine = (index: number, key: keyof typeof components[0], value: string | number) => {
    const updatedMachine = [...machine];
    (updatedMachine[index] as { [k in keyof typeof components[0]]: string | number })[key] = value;
    setMachine(updatedMachine);
  };
  const handleEditWork = (index: number, key: keyof typeof components[0], value: string | number) => {
    const updatedWork = [...work];
    (updatedWork[index] as { [k in keyof typeof components[0]]: string | number })[key] = value;
    setMachine(updatedWork);
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
                          setEdited(true); addComponent(nameinput.name, nameinput.qty)
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
                      {machine.map((component, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              type="text"
                              value={component.name}
                              onChange={(e) => handleEditMachine(index, "name", e.target.value)}
                            />
                          </TableCell>

                          <TableCell>
                            <Button className="bg-red-500" onClick={() => removeMachine(index)}>Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableCell><Button className="" onClick={addMachine}>+ Add New Machine</Button></TableCell>
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
                      {work.map((component, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              type="text"
                              value={component.name}
                              onChange={(e) => handleEditWork(index, "name", e.target.value)}
                            />
                          </TableCell>

                          <TableCell>
                            <Button className="bg-red-500" onClick={() => removeWork(index)}>Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableCell><Button className="" onClick={addWork}>+ Add New Workstation</Button></TableCell>
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

