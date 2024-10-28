import VersionsTable from "@/components/ui/versions-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation";

interface GetVersionsResponse {
    releases: {
        [version: string]: {
            filename: string,
            size: number,
            url: string,
            upload_time_iso_8601: string,
        }[]
    }
}

export default async function ListVersionsPage({ params }: { params: { name: string } }) {
    const response = await fetch(`https://pypi.org/pypi/${params.name}/json`, { method: "GET" });
    if(response.status === 404) notFound();
    const json: GetVersionsResponse = await response.json();
    const versions = Object.entries(json.releases).map(([k, v]) => {
        return { 
            name: params.name,
            version: k, 
            distributionCount: v.length, 
            uploadTimeISO8601: v[0]?.upload_time_iso_8601,
        };
    })

    return (
        <div className="flex flex-col items-center p-4 space-y-4">
            <p className="font-bold text-xl text-left">{ params.name }</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Lookup</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{ params.name }</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>
            <VersionsTable versions={versions} />
        </div>
    )

}
