// search-provider.tsx
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { type OwnerFilters, type PropertyFilters, type SearchContextType, type SearchFilter } from "@/types";
import { owners, properties } from "../../../dummyData";



const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [propertyFilters, setPropertyFilters] = useState<PropertyFilters>({});
    const [ownerFilters, setOwnerFilters] = useState<OwnerFilters>({});
    const [savedFilters, setSavedFilters] = useState<SearchFilter[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Generate suggestions based on current query
    useEffect(() => {
        if (searchQuery.length > 1) {
            const propertyAddresses = properties.map(p => p.address);
            const ownerNames = owners.map(o => o.name);
            const cities = [...new Set(properties.map(p => p.city))];
            console.log(cities);
            const allSuggestions = [
                ...propertyAddresses,
                ...ownerNames,
                ...cities
            ].filter(item => 
                item.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 10);
            
            setSuggestions(allSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    // Save filter to localStorage
    const saveFilter = useCallback((name: string) => {
        const newFilter: SearchFilter = {
            id: Date.now().toString(),
            name,
            filters: { ...propertyFilters, ...ownerFilters }
        };
        
        setSavedFilters(prev => {
            const updated = [...prev, newFilter];
            localStorage.setItem('savedFilters', JSON.stringify(updated));
            return updated;
        });
    }, [propertyFilters, ownerFilters]);

    // Load saved filters from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('savedFilters');
        if (saved) {
            try {
                setSavedFilters(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved filters", e);
            }
        }
    }, []);

    const loadFilter = useCallback((filterId: string) => {
        const filter = savedFilters.find(f => f.id === filterId);
        if (filter) {
            setPropertyFilters(filter.filters);
            setOwnerFilters(filter.filters);
        }
    }, [savedFilters]);

    const deleteFilter = useCallback((filterId: string) => {
        setSavedFilters(prev => {
            const updated = prev.filter(f => f.id !== filterId);
            localStorage.setItem('savedFilters', JSON.stringify(updated));
            return updated;
        });
    }, []);

    return (
        <SearchContext.Provider value={{
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
            deleteFilter
        }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}