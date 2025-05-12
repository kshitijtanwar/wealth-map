import type { Property, Owner } from "@/types";

export const mockProperties: Property[] = [
    {
        id: "1",
        address: "123 Park Avenue",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        coordinates: { lat: 40.7831, lng: -73.9712 },
        value: 2500000,
        size: 2100,
        ownerId: "owner1",
        images: [
            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        ],
    },
    {
        id: "2",
        address: "456 Ocean Drive",
        city: "Miami",
        state: "FL",
        zipCode: "33139",
        coordinates: { lat: 25.7617, lng: -80.1918 },
        value: 3200000,
        size: 3500,
        ownerId: "owner2",
        images: [
            "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        ],
    },
    {
        id: "3",
        address: "789 Sunset Blvd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90046",
        coordinates: { lat: 34.0522, lng: -118.2437 },
        value: 4800000,
        size: 4200,
        ownerId: "owner3",
        images: [
            "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
        ],
    },
];

export const mockOwner: Owner = {
    id: "owner1",
    name: "John Smith",
    type: "individual",
    estimatedNetWorth: 12400000,
    confidenceLevel: "high",
    wealthComposition: {
        realEstate: 45,
        stocks: 30,
        cash: 15,
        other: 10,
    },
    properties: ["1", "2", "3", "4"],
    lastUpdated: "2023-10-15",
};

// Dummy property points for map
export const properties = [
    {
        lat: 41.210079,
        lng: -104.82551,
        address: "123 Market Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94103",
        value: 2500000,
        size: 2100,
        images: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        ],
        owner: "John Smith",
        ownerType: "Individual Owner",
        netWorth: "$12.4M",
    },
    {
        lat: 37.7815,
        lng: -122.4056,
        address: "456 Castro Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94114",
        value: 1800000,
        size: 1600,
        images: [
            "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80",
        ],
        owner: "Jane Doe",
        ownerType: "Individual Owner",
        netWorth: "$8.2M",
    },
    {
        lat: 37.7689,
        lng: -122.4294,
        address: "789 Haight Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94117",
        value: 3100000,
        size: 2800,
        images: [
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
        ],
        owner: "Acme Properties LLC",
        ownerType: "Corporate Owner",
        netWorth: "$25.7M",
    },
];
