CREATE TABLE projects (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    project_name VARCHAR(150) NOT NULL,
    img_url VARCHAR(250) DEFAULT NULL,
    project_description TEXT NOT NULL,
    quantity INT NOT NULL,
    price_eth DECIMAL(10, 2) NOT NULL,
    open_date_gmt DATETIME NOT NULL,
    royalty_percent DECIMAL(5, 2) NOT NULL,
    active BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO projects (
    project_name,
    img_url,
    project_description,
    quantity,
    price_eth,
    open_date_gmt,
    royalty_percent,
    active
) VALUES 
(
    "The Bait Shop",
    "/Images/BaitShop.jpg",  -- Corrected path
    "This is an image of the old bait shop in Kopperl, TX.",
    25,
    1.0,
    "2024-02-01 09:00:00",
    7.00,
    0
),
(
    "Trips to Lake Whitney",
    "/Images/Trips.jpg",  -- Corrected path
    "This is the boat storage where we used to keep our boat and go out to Lake Whitney.",
    64,
    1.5,
    "2023-12-15 07:30:00",
    5.00,
    0
),
(
    "A Slow Descent",
    "/Images/ASlowDescent.jpg",  -- Corrected path
    "Project 3 will be in here",
    512,
    2.0,
    "2024-03-19 05:00:00",
    2.00,
    0
);
