import Sidebar from "@/components/ui/Sidebar";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHeader,TableRow,TableHead } from "@/components/ui/table";
import { AccordionContent } from "@radix-ui/react-accordion";

import React, { useEffect, useState} from "react";

const Inventory=()=>{
const [isSmall, setisSmall] = useState(false);
  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  })
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, [])

  
  return <>
    <div className={`hover:rounded-lg ${isSmall ? "" : "flex"} max-h-screen`}>
      <Sidebar/>
      <div className="flex flex-col flex-1">
        <Card className="info-card flex flex-col flex-1">
          <CardTitle className="m-2 "><span>Inventory</span></CardTitle>
          <CardDescription className="m-2">List of Available Resources</CardDescription>
            <CardContent className="flex-1">
              <Accordion  type="single" collapsible>
                <AccordionItem value="component">
                  <AccordionTrigger>
                    <CardTitle>Component</CardTitle>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Component</TableHead>
                          <TableHead className="text-right">Qty</TableHead>
                        </TableRow>
                      </TableHeader>


                    </Table>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="machine">
                  <AccordionTrigger>
                    <CardTitle>Machine</CardTitle>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="workstation">
                  <AccordionTrigger>
                    <CardTitle>Workstation</CardTitle>
                  </AccordionTrigger>
                </AccordionItem>

              </Accordion>
            </CardContent>
        </Card>
      </div>
    </div>
  </>
}

export default Inventory;
