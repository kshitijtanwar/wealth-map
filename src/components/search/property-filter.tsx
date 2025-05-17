// property-filter.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import { useSearch } from "@/context/search-provider";
import { useState } from "react";
import type { PropertyFilters, OwnerFilters } from "@/types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export function PropertyFilter() {
    const {
        propertyFilters,
        setPropertyFilters,
        ownerFilters,
        setOwnerFilters,
        savedFilters,
        saveFilter,
        loadFilter,
        deleteFilter,
    } = useSearch();

    const [filterName, setFilterName] = useState("");
    const [activeTab, setActiveTab] = useState<"properties" | "owners">(
        "properties"
    );

    const handlePropertyFilterChange = (
        key: keyof PropertyFilters,
        value: PropertyFilters[keyof PropertyFilters]
    ) => {
        setPropertyFilters({ ...propertyFilters, [key]: value });
    };

    const handleOwnerFilterChange = (
        key: keyof OwnerFilters,
        value: OwnerFilters[keyof OwnerFilters]
    ) => {
        setOwnerFilters({ ...ownerFilters, [key]: value });
    };

    const clearAllFilters = () => {
        setPropertyFilters({});
        setOwnerFilters({});
    };

    const hasFilters =
        Object.keys(propertyFilters).length > 0 ||
        Object.keys(ownerFilters).length > 0;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasFilters && (
                        <span className="ml-1 h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
                            {Object.keys(propertyFilters).length +
                                Object.keys(ownerFilters).length}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Filters</h3>
                    {hasFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                            onClick={clearAllFilters}
                        >
                            Clear all
                        </Button>
                    )}
                </div>

                <div className="flex border-b mb-4">
                    <button
                        className={`pb-2 px-4 ${
                            activeTab === "properties"
                                ? "border-b-2 border-primary"
                                : ""
                        }`}
                        onClick={() => setActiveTab("properties")}
                    >
                        Properties
                    </button>
                    <button
                        className={`pb-2 px-4 ${
                            activeTab === "owners"
                                ? "border-b-2 border-primary"
                                : ""
                        }`}
                        onClick={() => setActiveTab("owners")}
                    >
                        Owners
                    </button>
                </div>

                {activeTab === "properties" && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Address</Label>
                            <Input
                                value={propertyFilters.address || ""}
                                onChange={(e) =>
                                    handlePropertyFilterChange(
                                        "address",
                                        e.target.value
                                    )
                                }
                                placeholder="Search by address"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>City</Label>
                            <Input
                                value={propertyFilters.city || ""}
                                onChange={(e) =>
                                    handlePropertyFilterChange(
                                        "city",
                                        e.target.value
                                    )
                                }
                                placeholder="Filter by city"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>State</Label>
                            <Input
                                value={propertyFilters.state || ""}
                                onChange={(e) =>
                                    handlePropertyFilterChange(
                                        "state",
                                        e.target.value
                                    )
                                }
                                placeholder="Filter by state"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Value Range</Label>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">
                                    $
                                    {(
                                        propertyFilters.minValue || 0
                                    ).toLocaleString()}
                                </span>
                                <span className="text-sm">
                                    $
                                    {(
                                        propertyFilters.maxValue || 5000000
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <Slider
                                value={[
                                    propertyFilters.minValue || 0,
                                    propertyFilters.maxValue || 5000000,
                                ]}
                                max={5000000}
                                step={100000}
                                onValueChange={([min, max]: [
                                    number,
                                    number
                                ]) => {
                                    handlePropertyFilterChange("minValue", min);
                                    handlePropertyFilterChange("maxValue", max);
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Size (sq ft)</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    value={propertyFilters.minSize || ""}
                                    onChange={(e) =>
                                        handlePropertyFilterChange(
                                            "minSize",
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="Min"
                                    min={0}
                                />
                                <span>-</span>
                                <Input
                                    type="number"
                                    value={propertyFilters.maxSize || ""}
                                    onChange={(e) =>
                                        handlePropertyFilterChange(
                                            "maxSize",
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="Max"
                                    min={0}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "owners" && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Owner Name</Label>
                            <Input
                                value={ownerFilters.name || ""}
                                onChange={(e) =>
                                    handleOwnerFilterChange(
                                        "name",
                                        e.target.value
                                    )
                                }
                                placeholder="Search by owner name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Owner Type</Label>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="individual"
                                        checked={
                                            ownerFilters.type === "individual"
                                        }
                                        onCheckedChange={(checked: boolean) =>
                                            handleOwnerFilterChange(
                                                "type",
                                                checked
                                                    ? "individual"
                                                    : undefined
                                            )
                                        }
                                    />
                                    <Label htmlFor="individual">
                                        Individual
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="entity"
                                        checked={ownerFilters.type === "entity"}
                                        onCheckedChange={(checked: boolean) =>
                                            handleOwnerFilterChange(
                                                "type",
                                                checked ? "entity" : undefined
                                            )
                                        }
                                    />
                                    <Label htmlFor="entity">Entity</Label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Net Worth Range</Label>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">
                                    $
                                    {(
                                        ownerFilters.minNetWorth || 0
                                    ).toLocaleString()}
                                </span>
                                <span className="text-sm">
                                    $
                                    {(
                                        ownerFilters.maxNetWorth || 50000000
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <Slider
                                value={[
                                    ownerFilters.minNetWorth || 0,
                                    ownerFilters.maxNetWorth || 50000000,
                                ]}
                                max={50000000}
                                step={1000000}
                                onValueChange={([min, max]: [
                                    number,
                                    number
                                ]) => {
                                    handleOwnerFilterChange("minNetWorth", min);
                                    handleOwnerFilterChange("maxNetWorth", max);
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Confidence Level</Label>
                            <div className="flex gap-4">
                                {["low", "medium", "high"].map((level) => (
                                    <div
                                        key={level}
                                        className="flex items-center gap-2"
                                    >
                                        <Checkbox
                                            id={level}
                                            checked={
                                                ownerFilters.confidenceLevel?.includes(
                                                    level as
                                                        | "low"
                                                        | "medium"
                                                        | "high"
                                                ) || false
                                            }
                                            onCheckedChange={(
                                                checked: boolean
                                            ) => {
                                                const current =
                                                    ownerFilters.confidenceLevel ||
                                                    [];
                                                const updated = checked
                                                    ? [
                                                          ...current,
                                                          level as
                                                              | "low"
                                                              | "medium"
                                                              | "high",
                                                      ]
                                                    : current.filter(
                                                          (l) => l !== level
                                                      );
                                                handleOwnerFilterChange(
                                                    "confidenceLevel",
                                                    updated.length > 0
                                                        ? updated
                                                        : undefined
                                                );
                                            }}
                                        />
                                        <Label htmlFor={level}>
                                            {level.charAt(0).toUpperCase() +
                                                level.slice(1)}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center gap-2">
                        <Input
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                            placeholder="Name this filter"
                            className="flex-1"
                        />
                        <Button
                            onClick={() => {
                                if (filterName.trim()) {
                                    saveFilter(filterName);
                                    setFilterName("");
                                }
                            }}
                            disabled={!filterName.trim()}
                        >
                            Save
                        </Button>
                    </div>

                    {savedFilters.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">
                                Saved Filters
                            </h4>
                            <div className="space-y-2">
                                {savedFilters.map((filter) => (
                                    <div
                                        key={filter.id}
                                        className="flex items-center justify-between"
                                    >
                                        <button
                                            className="text-sm hover:underline"
                                            onClick={() =>
                                                loadFilter(filter.id)
                                            }
                                        >
                                            {filter.name}
                                        </button>
                                        <button
                                            className="text-muted-foreground hover:text-destructive"
                                            onClick={() =>
                                                deleteFilter(filter.id)
                                            }
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
