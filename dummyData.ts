import type { Property, Owner, Report } from "@/types";

// Step 1: Define owners without properties first
export const owners: Owner[] = [
    {
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
        properties: [], // to be filled later
        lastUpdated: "2023-10-15",
    },
    {
        id: "owner2",
        name: "Jane Doe",
        type: "individual",
        estimatedNetWorth: 8200000,
        confidenceLevel: "medium",
        properties: [],
        lastUpdated: "2023-10-15",
    },
    {
        id: "owner3",
        name: "Acme Properties LLC",
        type: "entity",
        estimatedNetWorth: 25700000,
        confidenceLevel: "high",
        properties: [],
        lastUpdated: "2023-10-15",
    },
];

// Step 2: Define properties, referencing owners
export const properties: Property[] = [
    {
        id: "85665192-a8cf-43b8-8618-520ec8b277e1",
        address: "123 Park Avenue",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        coordinates: { lat: 40.7831, lng: -73.9712 },
        value: 2500000,
        size: 2100,
        images: [
            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        ],
        owners: [owners[0]],
    },
    {
        id: "c7013085-1714-475b-91f4-00d060f8d6d0",
        address: "456 Ocean Drive",
        city: "Miami",
        state: "FL",
        zipCode: "33139",
        coordinates: { lat: 25.7617, lng: -80.1918 },
        value: 3200000,
        size: 3500,
        images: [
            "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        ],
        owners: [owners[1]],
    },
    {
        id: "87f23140-bfc4-4927-ad20-b51019c35a71",
        address: "789 Sunset Blvd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90046",
        coordinates: { lat: 34.0522, lng: -118.2437 },
        value: 4800000,
        size: 4200,
        images: [
            "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
        ],
        owners: [owners[2]],
    },
    {
        id: "3e5a82d5-ea2b-4cb8-a738-867dfbf65600",
        address: "101 Market Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.7749, lng: -122.4194 },
        value: 2100000,
        size: 1800,
        images: [
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
        ],
        owners: [owners[0]],
    },
    {
        id: "ecc40275-3e78-461a-9920-4231b27991f9",
        address: "202 Mission Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.7765, lng: -122.4172 },
        value: 2750000,
        size: 2200,
        images: [
            "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        ],
        owners: [owners[1]],
    },
    {
        id: "afade853-2872-4867-93d5-0455b4be2296",
        address: "303 Howard Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.7732, lng: -122.421 },
        value: 3200000,
        size: 2600,
        images: [
            "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
        ],
        owners: [owners[2]],
    },
    {
        id: "0e4640a9-bd0f-42b5-bc35-4ce5992fd576",
        address: "400 Folsom Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.785, lng: -122.3969 },
        value: 2950000,
        size: 2000,
        images: [
            "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
        ],
        owners: [owners[0]],
    },
    {
        id: "72a886c0-458e-443b-88cf-18c73cd06bb6",
        address: "500 Harrison Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.776, lng: -122.399 },
        value: 3100000,
        size: 2400,
        images: [
            "https://images.pexels.com/photos/210622/pexels-photo-210622.jpeg",
        ],
        owners: [owners[1]],
    },
    {
        id: "bd28d68c-00e8-4d2f-8aae-1ef7177defcc",
        address: "600 Howard Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.7725, lng: -122.41 },
        value: 3300000,
        size: 2700,
        images: [
            "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
        ],
        owners: [owners[2]],
    },
    {
        id: "4042f103-13d9-4a01-bc78-7e1c23f51a99",
        address: "700 Main Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.7755, lng: -122.418 },
        value: 2850000,
        size: 2100,
        images: [
            "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
        ],
        owners: [owners[0]],
    },
    {
        id: "cf51a8d5-8593-4324-b5f9-d1aa1ef4a6ff",
        address: "800 Beale Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.774, lng: -122.4165 },
        value: 3050000,
        size: 2300,
        images: [
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
        ],
        owners: [owners[1]],
    },
    {
        id: "cb129a21-6941-40b0-8bed-e0db7a841163",
        address: "900 Bryant Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.7738, lng: -122.4205 },
        value: 2950000,
        size: 2250,
        images: [
            "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
        ],
        owners: [owners[2]],
    },
    {
        id: "b6b4f082-2dca-4543-9678-eb455aa95e41",
        address: "1000 Harrison Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.7752, lng: -122.415 },
        value: 3150000,
        size: 2500,
        images: [
            "https://images.pexels.com/photos/210622/pexels-photo-210622.jpeg",
        ],
        owners: [owners[0]],
    },
    {
        id: "37d0a1f3-c52e-4dba-98e6-7c0bd5cb61e9",
        address: "1100 Folsom Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.7768, lng: -122.4188 },
        value: 3250000,
        size: 2600,
        images: [
            "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        ],
        owners: [owners[1]],
    },
    {
        id: "4f642ab9-4578-40da-bea2-d59a8c8465f5",
        address: "1200 Mission Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        coordinates: { lat: 37.773, lng: -122.4175 },
        value: 3050000,
        size: 2400,
        images: [
            "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        ],
        owners: [owners[2]],
    },
];

// Step 3: Link properties to owners
owners[0].properties = [
    properties[0],
    properties[3],
    properties[6],
    properties[10],
    properties[13],
];
owners[1].properties = [
    properties[1],
    properties[4],
    properties[7],
    properties[11],
    properties[14],
];
owners[2].properties = [
    properties[2],
    properties[5],
    properties[8],
    properties[12],
    properties[15],
];

// Export a default owner for mockOwner if needed
export const mockOwner = owners[0];

export const mockReports: Report[] = [
    {
        id: "1",
        title: "Q1 2024 Financial Analysis",
        createdBy: "John Doe",
        createdAt: "2024-03-15",
        status: "Completed",
    },
    {
        id: "2",
        title: "Market Research Report",
        createdBy: "Jane Smith",
        createdAt: "2024-03-10",
        status: "Draft",
    },
    {
        id: "3",
        title: "Annual Performance Review",
        createdBy: "Robert Johnson",
        createdAt: "2024-02-28",
        status: "Draft",
    },
];
