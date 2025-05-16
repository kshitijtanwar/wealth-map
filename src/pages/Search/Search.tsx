// Example page component
import { SearchFilter } from "@/components/utils/SearchFilter";
import { PropertyFilter } from "@/components/utils/property-filter";
import { SearchResults } from "@/components/utils/search-results";
import { SearchProvider } from "@/components/utils/search-provider";

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
