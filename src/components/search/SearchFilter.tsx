import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { type SearchBarProps } from "@/types";
import { useSearch } from "../../context/search-provider";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

export function SearchFilter({
    placeholder = "Search...",
    className,
}: SearchBarProps) {
    const { setSearchQuery, suggestions } = useSearch();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Update local query state when URL parameter changes
    useEffect(() => {
        const urlQuery = searchParams.get("q") || "";
        setQuery(urlQuery);
        setSearchQuery(urlQuery); // Also update the search context
    }, [searchParams, setSearchQuery]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(query);
        setShowSuggestions(false);

        if (location.pathname !== "/search") {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        } else {
            // Update the URL even on the search page
            const newParams = new URLSearchParams(searchParams);
            newParams.set("q", query);
            navigate(`${location.pathname}?${newParams.toString()}`, {
                replace: true,
            });
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        setSearchQuery(suggestion);
        setShowSuggestions(false);

        const newParams = new URLSearchParams(searchParams);
        newParams.set("q", suggestion);

        if (location.pathname !== "/search") {
            navigate(`/search?${newParams.toString()}`);
        } else {
            // Update the URL even on the search page
            navigate(`${location.pathname}?${newParams.toString()}`, {
                replace: true,
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setSearchQuery(newQuery);
        setShowSuggestions(true);
    };

    // Hide suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest(".search-container")) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-sm backdrop-blur-sm rounded-lg p-1 z-[15]">
            <form
                onSubmit={handleSubmit}
                className={`relative flex w-full items-center ${className}`}
            >
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none z-10" />
                    <Input
                        type="search"
                        placeholder={placeholder}
                        value={query}
                        onChange={handleInputChange}
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
                <ul className="absolute z-[10] mt-1 w-full bg-white dark:bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto text-sm">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:text-primary cursor-pointer transition-colors"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
