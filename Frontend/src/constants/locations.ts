export const LOCATIONS = [
    "New York",
    "Los Angeles",
    "Miami",
    "Chicago",
    "Houston",
    "Las Vegas",
    "San Francisco",
    "Boston",
] as const;

export type Location = (typeof LOCATIONS)[number];