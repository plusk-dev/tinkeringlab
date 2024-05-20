import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { Clock, Glasses, LampDesk, Puzzle } from "lucide-react";
import { getTokenFromStorage, getUrl, postUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { jwtDecode } from "jwt-decode";
import { toast } from "@/components/ui/use-toast";
import { DataContext } from "./page";
import { Request } from "./Columns";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const ICONS: any = {
  component: <Puzzle />,
  session: <Clock />,
  intern: <Glasses />,
  workstation: <LampDesk />,
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [remarks, setRemarks] = useState<any>();
  const [showRemarks, setShowRemarks] = useState(false);
  const [fetchedRemarks, setFetchedRemarks] = useState<any[]>();

  return (
    <div className="rounded-md border max-w-none">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              let newItem: any = row.original;

              return (
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Sheet
                        onOpenChange={(e) => {
                          getUrl("/remarks/get_remarks", {
                            request_id: newItem?.id,
                            request_type: newItem?.type,
                          }).then((response) => {
                            setFetchedRemarks(JSON.parse(response.data));
                            setShowRemarks(true);
                          });
                        }}
                      >
                        <SheetTrigger asChild>
                          <Button className="mb-1">Open</Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Request info</SheetTitle>
                          </SheetHeader>
                          <div className="mt-5">
                            <h3 className="font-bold text-lg text-gray-500">
                              Name: <br />
                            </h3>
                            <span className="font-normal">
                              {newItem?.user.name}
                            </span>
                            <h3 className="font-bold text-lg text-gray-500">
                              Request for:
                              <br />
                            </h3>
                            <span className="font-normal">{newItem?.type}</span>
                            <h3 className="font-bold text-lg text-gray-500">
                              Desc:
                            </h3>
                            <p className="border-zinc-500 min-h-10">
                              {newItem?.description}
                            </p>
                          </div>
                          {showRemarks && fetchedRemarks != undefined
                            ? fetchedRemarks
                                .reduceRight(
                                  (fetchedRemarks, curr) => [
                                    ...fetchedRemarks,
                                    curr,
                                  ],
                                  []
                                )
                                .map((remark: any) => {
                                  return (
                                    <div className="border-solid p-2 mb-2 rounded-lg border-2 border-slate-400">
                                      <b>Remark #{remark.id}</b>{" "}
                                      <span className="text-sm text-slate-400">
                                        {remark.created_at.split(".")[0]}
                                      </span>
                                      <br />
                                      {remark.content}
                                    </div>
                                  );
                                })
                            : "dont show"}
                          <Textarea
                            placeholder="Remarks"
                            className="mb-3"
                            onChange={(e) => {
                              setRemarks(e.target.value);
                            }}
                          />
                          <div className="flex justify-end">
                            <Button
                              className="mb-2 flex"
                              size={"sm"}
                              onClick={() => {
                                postUrl("/remarks/create", {
                                  content: remarks,
                                  email: (
                                    jwtDecode(
                                      JSON.stringify(getTokenFromStorage())
                                    ) as {
                                      email: string;
                                      iat: number;
                                    }
                                  ).email,
                                  request_type: newItem?.type,
                                  request_id: newItem?.id,
                                }).then((response) => {
                                  setFetchedRemarks([
                                    ...fetchedRemarks,
                                    response.data,
                                  ]);
                                  toast({
                                    variant: "success",
                                    title: "Remark send successfully",
                                  });
                                });
                              }}
                            >
                              + Add Remark
                            </Button>
                          </div>

                          <SheetFooter>
                            <div className="flex w-full gap-1">
                              <Button
                                className={
                                  newItem?.approved === true
                                    ? "hidden"
                                    : "flex-1"
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                className={
                                  newItem?.approved === false
                                    ? "hidden"
                                    : "flex-1"
                                }
                              >
                                Reject
                              </Button>
                            </div>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                </>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
