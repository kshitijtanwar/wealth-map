// Example page component
import { SearchFilter } from "@/components/search/SearchFilter";
import { PropertyFilter } from "@/components/search/property-filter";
import { SearchResults } from "@/components/search/search-results";
import { SearchProvider } from "@/context/search-provider";

export function SearchPage() {
    return (
        <SearchProvider>
            <div className="container py-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <SearchFilter />
                    </div>
                    <div>
                        <PropertyFilter />
                    </div>
                </div>

                <SearchResults />
            </div>
        </SearchProvider>
    );
}
