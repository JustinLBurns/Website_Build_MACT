// db.js
export async function getAllProjects() {
    // Return static project data for now (this can later be replaced with a database query)
    return [
        {
            id: 1,
            project_name: 'The Bait Shop',
            img_url: 'https://res.cloudinary.com/dcntnh737/image/upload/v1741631990/The_Bait_Shop_Justin_Burns_r4bazu.jpg',
            project_description: 'This project is about the unique concept of The Bait Shop...',
            quantity: 25,
            price_eth: '1.00',
            open_date_gmt: '2024-02-01T15:00:00.000Z',
            royalty_percent: '7.00',
            active: 0
        },
        {
            id: 2,
            project_name: 'Trips to Lake Whitney',
            img_url: 'https://res.cloudinary.com/dcntnh737/image/upload/v1741632042/Trips_kbik6j.jpg',
            project_description: 'This project showcases trips to Lake Whitney, capturing beautiful moments...',
            quantity: 64,
            price_eth: '1.50',
            open_date_gmt: '2023-12-15T13:30:00.000Z',
            royalty_percent: '5.00',
            active: 0
        }
    ];
}
