import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-emerald-600 focus-visible:ring-emerald-600/50 focus-visible:ring-[1px] mt-1",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
            {...props}
        />
    );
}

interface IconInputProps extends React.ComponentProps<"input"> {
    icon?: React.ReactNode;
}

function IconInput({ className, type, icon, ...props }: IconInputProps) {
    return (
        <div className="relative mt-1">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                </div>
            )}
            <input
                type={type}
                data-slot="input"
                className={cn(
                    "!pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500",
                    className
                )}
                {...props}
            />
        </div>
    );
}

export { Input, IconInput };
