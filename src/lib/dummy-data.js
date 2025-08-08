// This file contains dummy data for the project.
// In a real application, this data would come from a database.

export const users = [
  {
    id: "user_1",
    name: "Peter Jones",
    email: "peter@example.com",
    totalCalls: 0,
    conversionRate: 0.0,
    status: "Offline",
  },
  {
    id: "user_2",
    name: "John Wick",
    email: "john@example.com",
    totalCalls: 21,
    conversionRate: 0.0,
    status: "Offline",
  },
  {
    id: "user_3",
    name: "Sara Smith",
    email: "sara@example.com",
    totalCalls: 27,
    conversionRate: 0.0,
    status: "Online",
  },
  {
    id: "user_4",
    name: "Admin User",
    email: "admin@example.com",
    totalCalls: 0,
    conversionRate: 0.0,
    status: "Online",
  }
];

export const leads = [
  {
    id: 25,
    name: "Ankit Sharma",
    phone: "8982508667",
    gender: "Male",
    school: "Delhi Public School, Siliguri",
    locality: "Pradhan Nagar",
    district: "Darjeeling",
    campaign: null,
    tags: [],
    assignedToId: "user_3",
    disposition: "Not Interested",
    createdAt: "2025-07-22T10:00:00Z",
    location: { lat: 26.7271, lng: 88.3953 },
  },
  {
    id: 68,
    name: "Priya Singh",
    phone: "7616345765",
    gender: "Other",
    school: "Delhi Public School, Siliguri",
    locality: "Pradhan Nagar",
    district: "Darjeeling",
    campaign: null,
    tags: [],
    assignedToId: "user_3",
    disposition: "New",
    createdAt: "2025-07-21T11:30:00Z",
    location: { lat: 26.7271, lng: 88.3953 },
  },
  {
    id: 88,
    name: "Rohan Das",
    phone: "8475057877",
    gender: "Female", // Assuming data entry error from image for variety
    school: "Delhi Public School, Siliguri",
    locality: "Salbari",
    district: "Darjeeling",
    campaign: null,
    tags: [],
    assignedToId: "user_3",
    disposition: "New",
    createdAt: "2025-07-21T09:00:00Z",
    location: { lat: 26.7447, lng: 88.3922 },
  },
  {
    id: 39,
    name: "Sneha Gupta",
    phone: "6132397735",
    gender: "Female",
    school: "Techno India Group Public School",
    locality: "Hakim Para",
    district: "Darjeeling",
    campaign: null,
    tags: [],
    assignedToId: "user_3",
    disposition: "New",
    createdAt: "2025-07-20T15:00:00Z",
    location: { lat: 26.7110, lng: 88.4235 },
  },
  {
    id: 101,
    name: "Vikram Kumar",
    phone: "9988776655",
    gender: "Male",
    school: "St. Joseph's School",
    locality: "Sevoke Road",
    district: "Darjeeling",
    campaign: "Summer 2025",
    tags: ["High-Interest"],
    assignedToId: null, // Unassigned
    disposition: "New",
    createdAt: "2025-08-05T14:00:00Z",
    location: { lat: 26.7321, lng: 88.4356 },
  },
];

export const activities = [
    {
        id: 'act_1',
        userName: 'Sara Smith',
        description: 'updated lead #68 to New.',
        timestamp: '2025-08-06T14:30:00Z'
    },
    {
        id: 'act_2',
        userName: 'Admin User',
        description: 'assigned lead #39 to Sara Smith.',
        timestamp: '2025-08-06T12:15:00Z'
    },
    {
        id: 'act_3',
        userName: 'Sara Smith',
        description: 'marked lead #25 as Not Interested.',
        timestamp: '2025-08-05T18:00:00Z'
    }
]