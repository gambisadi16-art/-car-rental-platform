export interface Location {
    id: string;
    city: string;
    country: string;
    imageUrl: string;
    carCount: number;
}

export const mockLocations: Location[] = [
    {
        id: "1",
        city: "New York",
        country: "USA",
        imageUrl:
            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
        carCount: 142,
    },
    {
        id: "2",
        city: "Los Angeles",
        country: "USA",
        imageUrl:
            "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80",
        carCount: 98,
    },
    {
        id: "3",
        city: "Miami",
        country: "USA",
        imageUrl:
            "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800&q=80",
        carCount: 76,
    },
    {
        id: "4",
        city: "Chicago",
        country: "USA",
        imageUrl:
            "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80",
        carCount: 54,
    },
];