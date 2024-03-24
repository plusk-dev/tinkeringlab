import Sidebar from "@/components/ui/Sidebar";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHeader,TableRow,TableHead,TableCell } from "@/components/ui/table";
import { AccordionContent } from "@radix-ui/react-accordion";
import React, { useEffect, useState } from "react";




const Inventory: React.FC = () => {
  const [isSmall, setisSmall] = useState<boolean>(false);
  const [components, setComponents] = useState<{ name: string; quantity: number }[]>([]);
  const [machine,setMachine]=useState<{name:string}[]>([]);
  const [work,setWork]=useState<{name:string}[]>([]);


  window.addEventListener("resize", () => {
    setisSmall(window.innerWidth <= 1000);
  });

  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, []);


  const addComponent = () => {
    setComponents([...components, { name: "", quantity: 0 }]);
  };
  const addMachine = () => {
    setMachine([...machine, { name: "" }]);
  };
  const addWork=()=>{
    setWork([...work,{name:""}])
  }

  const removeComponent = (index: number) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1);
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
                              onChange={(e) => handleEditComponent(index, "name", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={component.quantity}
                              onChange={(e) => handleEditComponent(index, "quantity", parseInt(e.target.value))}
                            />
                          </TableCell>
                          <TableCell>
                            <Button className="bg-red-500" onClick={() => removeComponent(index)}>Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableCell><Button className="" onClick={addComponent}>+ Add Component</Button></TableCell>
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

