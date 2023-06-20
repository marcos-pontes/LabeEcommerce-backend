-- Active: 1687220543587@@127.0.0.1@3306

CREATE TABLE
    if NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT UNIQUE NOT NULL,
        created_at TEXT NOT NULL
    );

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES
(
        "u001",
        "Samuel",
        "samuel@gmail.com",
        "samuel123",
        "2023-06-19T13:28:45.123Z"
    ), (
        "u002",
        "Ruan",
        "ruan@gmail.com",
        "ruan123",
        "2023-06-19T14:05:12.987Z"
    ), (
        "u003",
        "Dhouglas",
        "dhouglas@gmail.com",
        "dhouglass123",
        "2023-06-19T16:42:30.456Z"
    );

--------------------------------------------- PRODUCTS

CREATE TABLE
    if NOT EXISTS products (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES
(
        "prod001",
        "Mouse gamer",
        250,
        "Melhor mouse do mercado!",
        "https://picsum.photos/seed/Mouse%20gamer/400"
    ), (
        "prod002",
        "Monitor",
        900,
        "Monitor LED Full HD 24 polegadas",
        "https://picsum.photos/seed/Monitor/400"
    ), (
        "prod003",
        "Teclado Mecânico RGB",
        350,
        "Teclado mecânico com retroiluminação RGB personalizável",
        "https://picsum.photos/seed/Teclado%20Mecânico/400"
    ), (
        "prod004",
        "Headset Gamer com Microfone",
        400,
        "Headset gamer com som imersivo e microfone integrado",
        "https://picsum.photos/seed/Headset%20Gamer/400"
    ), (
        "prod005",
        "Cadeira Gamer Ergonômica",
        800,
        "Cadeira gamer ergonômica com ajustes de altura e inclinação",
        "https://picsum.photos/seed/Cadeira%20Gamer/400"
    );