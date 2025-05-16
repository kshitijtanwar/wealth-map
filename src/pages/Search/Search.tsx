// Example page component
import { SearchBar } from "@/components/utils/search-bar";
import { PropertyFilter } from "@/components/utils/property-filter";
import { SearchResults } from "@/components/utils/search-results";
import { SearchProvider } from "@/components/utils/search-provider";

export function SearchPage() {
    return (
        <SearchProvider>
            <div className="container py-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <SearchBar />
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
