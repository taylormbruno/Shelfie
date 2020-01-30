DROP DATABASE IF EXISTS shelfie_db;
CREATE DATABASE shelfie_db;
USE DATABASE shelfie_db;

-- book_id will be bib_key 
CREATE TABLE user (
  id INT AUTO_INCREMENT NOT NULL, 
  book_title VARCHAR(150),
  shelf VARCHAR(150) NOT NULL,
  book_id VARCHAR(150),
  PRIMARY KEY (id)
);

-- Shelf will vary between "Unread", "Current", and "Read"
-- Use update to place books into users list based off event listeners
-- add book id from api to retrieve for full view