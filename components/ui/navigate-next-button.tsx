"use client"
import Link from "next/link";
import { Button } from "./button";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { useState } from "react";


export default function NavigateNextButton({ href }: { href: string }) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Button variant="outline" disabled={isLoading} onClick={() => setIsLoading(true)} asChild>
            <Link href={href}>
                {isLoading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4"/>}
            </Link>
        </Button>
    )
}
