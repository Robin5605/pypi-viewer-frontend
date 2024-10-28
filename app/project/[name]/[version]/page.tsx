import DistributionsTable from "@/components/ui/distributions-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation";

interface GetDistributionsResponse {
    urls: {
        filename: string,
        url: string,
        size: number,
        upload_time_iso_8601: string,
    }[]
}
export default async function ListDistributionsPage({ params }: { params: { name: string, version: string } }) {
    const response = await fetch(`https://pypi.org/pypi/${params.name}/${params.version}/json`, { method: "GET" });
    if(response.status === 404) notFound();
    const json: GetDistributionsResponse = await response.json();
    const distributions = json.urls.map((dist) => { 
        return {
            name: params.name,
            version: params.version,
            filename: dist.filename,
            uploadTimeISO8601: dist.upload_time_iso_8601,
            downloadURL: dist.url,
            size: dist.size,
        }
    });

    return (
        <div className="flex flex-col items-center p-4 space-y-4">
            <p className="font-bold text-xl text-center font-mono">{`${params.name} v${params.version}`}</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Lookup</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/project/${params.name}`}>{ params.name }</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{ params.version }</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <DistributionsTable distributions={distributions}/>
        </div>
    )
}
