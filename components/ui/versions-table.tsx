"use client"

import dayjs from "dayjs";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import RelativeTimstamp from "../timestamp";
import { Button } from "./button";
import { ArrowUpDown } from "lucide-react";
import NavigateNextButton from "./navigate-next-button";

interface PackageVersion {
    name: string,
    version: string,
    distributionCount: number,
    uploadTimeISO8601?: string,
}

const columns: ColumnDef<PackageVersion>[] = [
    {
        id: "version",
        accessorKey: "version",
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Version
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
        cell: ({ row }) => row.original.uploadTimeISO8601 ? <RelativeTimstamp date={dayjs(row.original.uploadTimeISO8601)} /> : "-",
    },
    {
        id: "distributionCount",
        accessorKey: "distributionCount",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Distributions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <NavigateNextButton href={`/project/${row.original.name}/${row.original.version}/`} />
    },
]

export default function VersionsTable({ versions }: { versions: PackageVersion[] }) {
    return <DataTable columns={columns} data={versions} defaultSorting={[{id: "uploadTime", desc: true}]}/>
}
