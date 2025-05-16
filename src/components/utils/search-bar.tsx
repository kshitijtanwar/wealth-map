// search-bar.tsx
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { type SearchBarProps } from "@/types";
import { useSearch } from "./search-provider";

export function SearchBar({ placeholder = "Search...", className }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const { setSearchQuery, suggestions } = useSearch();
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(query);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-full max-w-sm">
            <form
                onSubmit={handleSubmit}
                className={`relative flex w-full items-center ${className}`}
            >
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSearchQuery(e.target.value);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full pl-9 pr-12"
                        aria-label="Search"
                    />
                    <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                        <span className="sr-only">Search</span>
                        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                            ⏎
                        </kbd>
                    </Button>
                </div>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                    <ul className="max-h-60 overflow-auto py-1">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}