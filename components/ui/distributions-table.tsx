"use client"

import dayjs from "dayjs";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import RelativeTimstamp from "../timestamp";
import { Button } from "./button";
import { ArrowUpDown, Download } from "lucide-react";
import Link from "next/link";
import NavigateNextButton from "./navigate-next-button";
import { humanizeSize } from "@/lib/humanize";

interface Distribution {
    name: string,
    version: string,
    filename: string,
    downloadURL: string,
    uploadTimeISO8601: string,
    size: number,
}

function distributionDownloadURLToViewer(name: string, version: string, distributionDownloadURL: string): string {
    const url = new URL(distributionDownloadURL);
    return `/project/${name}/${version}` + url.pathname;
}

const columns: ColumnDef<Distribution>[] = [
    {
        id: "filename",
        accessorKey: "filename",
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    File Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        id: "uploadTime",
        accessorKey: "uploadTimeISO8601",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Upload Time 
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = dayjs(row.original.uploadTimeISO8601);
            return <RelativeTimstamp date={date} />
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
        cell: ({ row }) => humanizeSize(row.original.size),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const original = row.original;
            return (
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={original.downloadURL}>
                            <Download className="h-4 w-4 text-muted-primary" />
                        </Link>
                    </Button>

                    <NavigateNextButton href={distributionDownloadURLToViewer(original.name, original.version, original.downloadURL)} />
                </div>
            );
        },
    },
]

export default function DistributionsTable({ distributions }: { distributions: Distribution[] }) {
    return <DataTable columns={columns} data={distributions}/>
}
