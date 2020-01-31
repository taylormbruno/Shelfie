DROP DATABASE IF EXISTS shelfie_db;

CREATE DATABASE shelfie_db;

USE shelfie_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL, 
    username VARCHAR(150) NOT NULL,
    pword VARCHAR(150) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE books (
    id INT AUTO_INCREMENT NOT NULL, 
    book_title VARCHAR(150),
    book_id VARCHAR(150),
    book_shelf VARCHAR(150),
    user VARCHAR(150),
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(username)
);