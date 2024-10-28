import FileViewer from "@/components/ui/file-viewer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation";

interface ViewFileContentPageProps {
    params: {
        name: string,
        version: string,
        first: string,
        second: string,
        rest: string,
        distname: string,
        filepath: string[],
    }
}

export default async function ViewFileContentPage({ params }: ViewFileContentPageProps) {
    const file = params.filepath.join("/");
    const url = `${process.env.PYPI_VIEWER_BASE_URL}/packages/${params.first}/${params.second}/${params.rest}/${params.distname}/${file}`;
    const response = await fetch(url);
    if(response.status === 404) notFound();
    if(parseInt(response.headers.get("Content-Length") ?? "0") > 128e8) { // 128MB
        return <p>File size too large</p>;
    }
    
    if(!response.body) return;
    let content: string;
    try {
        content = new TextDecoder("utf-8", { fatal: true }).decode(await response.arrayBuffer());
        console.log(content);
    } catch(e) {
        if(e instanceof TypeError) return <p>File is not valid UTF-8.</p>;
        throw e;
    }

    return (
        <div className="p-4 space-y-8">
            <div className="flex flex-col items-center space-y-4">
                <p className="font-bold text-xl text-center font-mono">{file}</p>
                <Breadcrumb className="">
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
                        <BreadcrumbLink 
                            href={`/project/${params.name}/${params.version}/packages/${params.first}/${params.second}/${params.rest}/${params.distname}/`}
                        >
                            { params.distname }
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage> { params.filepath.join("/") } </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
            </div>
            <FileViewer filename={file} content={content} />
        </div>
    )

}
