import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import {
    type OwnerFilters,
    type PropertyFilters,
    type SearchContextType,
    type SearchFilter,
} from "@/types";
import { owners, properties } from "../../dummyData";
import { useSearchParams, useLocation } from "react-router-dom";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    // Initialize state from URL parameters
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [propertyFilters, setPropertyFilters] = useState<PropertyFilters>(
        () => {
            try {
                const filters = searchParams.get("propertyFilters");
                return filters ? JSON.parse(decodeURIComponent(filters)) : {};
            } catch {
                return {};
            }
        }
    );
    const [ownerFilters, setOwnerFilters] = useState<OwnerFilters>(() => {
        try {
            const filters = searchParams.get("ownerFilters");
            return filters ? JSON.parse(decodeURIComponent(filters)) : {};
        } catch {
            return {};
        }
    });

    const [savedFilters, setSavedFilters] = useState<SearchFilter[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Update suggestions based on current query
    useEffect(() => {
        if (searchQuery.length > 1) {
            const propertyAddresses = properties.map((p) => p.address);
            const ownerNames = owners.map((o) => o.name);
            const cities = [...new Set(properties.map((p) => p.city))];

            const allSuggestions = [
                ...propertyAddresses,
                ...ownerNames,
                ...cities,
            ]
                .filter((item) =>
                    item.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 10);

            setSuggestions(allSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    // Update URL when search state changes
    useEffect(() => {
        if (location.pathname === "/search") {
            const newParams = new URLSearchParams(searchParams);

            if (searchQuery) {
                newParams.set("q", searchQuery);
            } else {
                newParams.delete("q");
            }

            if (Object.keys(propertyFilters).length > 0) {
                newParams.set(
                    "propertyFilters",
                    encodeURIComponent(JSON.stringify(propertyFilters))
                );
            } else {
                newParams.delete("propertyFilters");
            }

            if (Object.keys(ownerFilters).length > 0) {
                newParams.set(
                    "ownerFilters",
                    encodeURIComponent(JSON.stringify(ownerFilters))
                );
            } else {
                newParams.delete("ownerFilters");
            }

            setSearchParams(newParams, { replace: true });
        }
    }, [
        searchQuery,
        propertyFilters,
        ownerFilters,
        location.pathname,
        searchParams,
        setSearchParams,
    ]);

    // Save filter to localStorage
    const saveFilter = useCallback(
        (name: string) => {
            const newFilter: SearchFilter = {
                id: Date.now().toString(),
                name,
                filters: { ...propertyFilters, ...ownerFilters },
            };

            setSavedFilters((prev) => {
                const updated = [...prev, newFilter];
                localStorage.setItem("savedFilters", JSON.stringify(updated));
                return updated;
            });
        },
        [propertyFilters, ownerFilters]
    );

    // Load saved filters from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("savedFilters");
        if (saved) {
            try {
                setSavedFilters(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved filters", e);
            }
        }
    }, []);

    const loadFilter = useCallback(
        (filterId: string) => {
            const filter = savedFilters.find((f) => f.id === filterId);
            if (filter) {
                setPropertyFilters(filter.filters);
                setOwnerFilters(filter.filters);
            }
        },
        [savedFilters]
    );

    const deleteFilter = useCallback((filterId: string) => {
        setSavedFilters((prev) => {
            const updated = prev.filter((f) => f.id !== filterId);
            localStorage.setItem("savedFilters", JSON.stringify(updated));
            return updated;
        });
    }, []);

    return (
        <SearchContext.Provider
            value={{
                searchQuery,
                propertyFilters,
                ownerFilters,
                savedFilters,
                suggestions,
                setSearchQuery,
                setPropertyFilters,
                setOwnerFilters,
                saveFilter,
                loadFilter,
                deleteFilter,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}
