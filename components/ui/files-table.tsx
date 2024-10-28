"use client"

import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./button";
import { ArrowUpDown, Download } from "lucide-react";
import Link from "next/link";
import NavigateNextButton from "./navigate-next-button";
import { humanizeSize } from "@/lib/humanize";

interface File {
    packageName: string,
    packageVersion: string,
    path: string,
    size: number,
    downloadURL: string,
}

function fileDownloadURLToViewerURL(name: string, version: string, fileDownloadURL: string): string {
    const url = new URL(fileDownloadURL);
    return `/project/${name}/${version}` + url.pathname;
}

const columns: ColumnDef<File>[] = [
    {
        id: "path",
        accessorKey: "path",
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="p-4" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    File
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        id: "size",
        accessorKey: "size",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Size
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <p className="text-left">{ humanizeSize(row.original.size) }</p>
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const file = row.original;
            return (
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={file.downloadURL}>
                            <Download className="h-4 w-4 text-muted-primary" />
                        </Link>
                    </Button>

                    <NavigateNextButton href={fileDownloadURLToViewerURL(file.packageName, file.packageVersion, file.downloadURL)} />
                </div>
            );
        },
    },
]

export default function FilesTable({ files }: { files: File[] }) {
    return <DataTable columns={columns} data={files}/>
}
