"use client"

import { languages } from "monaco-editor";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react").then(mod => mod.Editor), { ssr: false, loading: () => <p>Loading...</p> });

function getLanguage(filename: string): string | null {
    for(const lang of languages.getLanguages()) {
        if(lang.extensions?.some(ext => filename.endsWith(ext))) return lang.id;
        if(lang.filenames?.includes(filename)) return lang.id;
    }

    return null;
}

function getDisplayLanguage(language: languages.ILanguageExtensionPoint) {
    const aliases = language.aliases ?? [];
    if(aliases.length > 0) {
        return aliases[0];
    }

    return language.id;
}

export default function FileViewer({ filename, content }: { filename: string, content: string }) {
    const [language, setLanguage] = useState<string>(getLanguage(filename) ?? "plaintext");

    return (
        <div className="space-y-4">
            <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {languages.getLanguages().map(lang => <SelectItem key={lang.id} value={lang.id}>{ getDisplayLanguage(lang) }</SelectItem>)}
                </SelectContent>
            </Select>
            <Editor 
                language={language} 
                value={content} 
                height={"50vh"} 
                theme="vs-dark" 
                options={{readOnly: true}}
            />
        </div>
    )
}
