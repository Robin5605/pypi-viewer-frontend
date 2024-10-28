import FilesTable from "@/components/ui/files-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation";

interface ListFilesPageProps {
    params: {
        name: string,
        version: string,
        first: string,
        second: string,
        rest: string,
        distname: string,
    }
}

interface File {
    name: string
    size: number
}
export default async function ListFilesPage({ params }: ListFilesPageProps) {
    const url = `${process.env.PYPI_VIEWER_BASE_URL}/packages/${params.first}/${params.second}/${params.rest}/${params.distname}/`;
    const response = await fetch(url, {
        cache: "force-cache",
    });
    if(response.status === 404) notFound();
    const json = await response.json() as File[];
    return (
        <div className="flex flex-col items-center p-4 space-y-4">
            <p className="font-bold text-xl text-center font-mono">{ params.distname }</p>
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
                  <BreadcrumbLink href={`/project/${params.name}/${params.version}`}>{ params.version }</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{ params.distname }</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <FilesTable files={json.map(file => ({
                packageName: params.name,
                packageVersion: params.version,
                path: file.name,
                size: file.size,
                downloadURL: url + file.name,
            }))} />
        </div>
    )
}
