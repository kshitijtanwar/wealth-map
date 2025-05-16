import { SearchResults } from "@/components/utils/search-results";

const SearchResult = () => {
    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-2">Search Results</h1>
                <p className="text-muted-foreground">
                    View and filter your search results
                </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm">
                <SearchResults />
            </div>
        </div>
    );
};

export default SearchResult; 