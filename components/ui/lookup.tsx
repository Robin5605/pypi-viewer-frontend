"use client"

import { useState } from "react"
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PackageLookup() {
    const [name, setName] = useState("");
    const [version, setVersion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    function handleRedirect() {
        setIsLoading(true);
        let url = "/project/" + name;
        if(version) url += `/${version}`;

        router.push(url);
    }
    
    return (
        <div className="w-fit border rounded p-4 grid  grid-cols-2 gap-4">
            <p className="font-bold text-xl col-span-2 h-min">Package Lookup</p>

            <div className="space-y-1">
                <Label htmlFor="name-input">Name</Label>
                <Input id="name-input" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="space-y-1">
                <Label htmlFor="version-input">Version</Label>
                <Input id="version-input" value={version} onChange={e => setVersion(e.target.value)}/>
            </div>

            <Button 
                className="col-span-2"
                disabled={!name || isLoading}
                onClick={handleRedirect}
            >
                {isLoading ? <Loader2Icon className="animate-spin" /> : "Search"}
            </Button>
        </div>
    )

}
