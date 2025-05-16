// search-results.tsx
import { useSearch } from "@/components/utils/search-provider";
import { properties, owners } from "../../../dummyData";
import type { Property, Owner } from "@/types";

export function SearchResults() {
    const { searchQuery, propertyFilters, ownerFilters } = useSearch();

    // Filter properties based on search criteria
    const filteredProperties = properties.filter(property => {
        // Search query matching
        const matchesQuery = 
            !searchQuery ||
            property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.owner.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Property filters
        const matchesPropertyFilters = 
            (!propertyFilters.address || property.address.toLowerCase().includes(propertyFilters.address.toLowerCase())) &&
            (!propertyFilters.city || property.city.toLowerCase().includes(propertyFilters.city.toLowerCase())) &&
            (!propertyFilters.state || property.state.toLowerCase().includes(propertyFilters.state.toLowerCase())) &&
            (!propertyFilters.minValue || property.value >= propertyFilters.minValue) &&
            (!propertyFilters.maxValue || property.value <= propertyFilters.maxValue) &&
            (!propertyFilters.minSize || property.size >= propertyFilters.minSize) &&
            (!propertyFilters.maxSize || property.size <= propertyFilters.maxSize);

        // Owner filters
        const matchesOwnerFilters = 
            (!ownerFilters.name || property.owner.name.toLowerCase().includes(ownerFilters.name.toLowerCase())) &&
            (!ownerFilters.type || property.owner.type === ownerFilters.type) &&
            (!ownerFilters.minNetWorth || property.owner.estimatedNetWorth >= ownerFilters.minNetWorth) &&
            (!ownerFilters.maxNetWorth || property.owner.estimatedNetWorth <= ownerFilters.maxNetWorth) &&
            (!ownerFilters.confidenceLevel || ownerFilters.confidenceLevel.includes(property.owner.confidenceLevel));

        return matchesQuery && matchesPropertyFilters && matchesOwnerFilters;
    });


    // Filter owners based on search criteria
    const filteredOwners = owners.filter(owner => {
        // Search query matching
        const matchesQuery = 
            !searchQuery ||
            owner.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Owner filters
        const matchesOwnerFilters = 
            (!ownerFilters.name || owner.name.toLowerCase().includes(ownerFilters.name.toLowerCase())) &&
            (!ownerFilters.type || owner.type === ownerFilters.type) &&
            (!ownerFilters.minNetWorth || owner.estimatedNetWorth >= ownerFilters.minNetWorth) &&
            (!ownerFilters.maxNetWorth || owner.estimatedNetWorth <= ownerFilters.maxNetWorth) &&
            (!ownerFilters.confidenceLevel || ownerFilters.confidenceLevel.includes(owner.confidenceLevel));

        return matchesQuery && matchesOwnerFilters;
    });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold mb-4">Properties ({filteredProperties.length})</h2>
                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No properties match your search criteria</p>
                )}
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Owners ({filteredOwners.length})</h2>
                {filteredOwners.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredOwners.map(owner => (
                            <OwnerCard key={owner.id} owner={owner} />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No owners match your search criteria</p>
                )}
            </div>
        </div>
    );
}

// Helper components for displaying results
function PropertyCard({ property }: { property: Property }) {
    return (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                {property.images?.[0] && (
                    <img 
                        src={property.images[0]} 
                        alt={property.address} 
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
            <h3 className="font-medium">{property.address}</h3>
            <p className="text-sm text-muted-foreground">
                {property.city}, {property.state} {property.zipCode}
            </p>
            <div className="mt-2 flex justify-between items-center">
                <span className="font-medium">
                    ${property.value.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                    {property.size.toLocaleString()} sq ft
                </span>
            </div>
            <div className="mt-2 pt-2 border-t">
                <p className="text-sm">
                    Owner: <span className="font-medium">{property.owner.name}</span>
                </p>
            </div>
        </div>
    );
}

function OwnerCard({ owner }: { owner: Owner }) {
    return (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium">{owner.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">
                {owner.type} • {owner.confidenceLevel} confidence
            </p>
            <div className="mt-3">
                <p className="font-medium">
                    ${owner.estimatedNetWorth.toLocaleString()}
                </p>
                {owner.wealthComposition && (
                    <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>Real Estate:</span>
                            <span>{owner.wealthComposition.realEstate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Stocks:</span>
                            <span>{owner.wealthComposition.stocks}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Cash:</span>
                            <span>{owner.wealthComposition.cash}%</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-3 pt-2 border-t">
                <p className="text-sm">
                    Properties: <span className="font-medium">{owner.properties.length}</span>
                </p>
            </div>
        </div>
    );
}