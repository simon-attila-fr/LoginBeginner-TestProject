CREATE TABLE
    `users` (
        `id` INT PRIMARY KEY AUTO_INCREMENT,
        `email` VARCHAR(255) UNIQUE NOT NULL,
        `username` VARCHAR(255) UNIQUE NOT NULL,
        `password` VARCHAR(255) NOT NULL,
        `isadmin` VARCHAR(1) NOT NULL
    );