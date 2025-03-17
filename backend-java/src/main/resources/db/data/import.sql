-- changeset midas:1735030555058-1000
INSERT INTO bookStore.book_genres (id,descriptions,name) VALUES
(1,NULL,'Fiction'),
(2,NULL,'Historical fiction'),
(3,NULL,'Fantasy, children''s fiction'),
(4,NULL,'Fantasy'),
(5,NULL,'Mystery'),
(6,NULL,'Family saga'),
(7,NULL,'Adventure'),
(8,NULL,'Fantasy, absurdist fiction'),
(9,NULL,'Mystery thriller'),
(10,NULL,'Coming-of-age');

-- changeset midas:1735030555058-1001
INSERT INTO bookStore.books (number_of_books,price,promotion,rating,genre_id,id,cover,author,title,cover_image,inventory_status,price_status) VALUES
(NULL,40.00,0,10,1,7,'HARD','J. R. R. Tolkien','The Hobbit',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,8,'HARD',' 	Lewis Carroll','Alice''s Adventures in Wonderland',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,9,'HARD','C.S. Lewis','The Lion, the Witch and the Wardrobe',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,10,'HARD','H. Rider Haggard','She: A History of Adventure',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,11,'HARD','Dan Brown','The Da Vinci Code',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,12,'HARD','J. K. Rowling','Harry Potter and the Chamber of Secrets',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,13,'HARD','J. D. Salinger','The Catcher in the Rye',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,14,'HARD','J. K. Rowling','Harry Potter and the Prisoner of Azkaban',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,15,'HARD','J. K. Rowling','Harry Potter and the Goblet of Fire',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,16,'HARD','J. K. Rowling','Harry Potter and the Order of Phoenix',NULL,'INSTOCK',NULL);
INSERT INTO bookStore.books (number_of_books,price,promotion,rating,genre_id,id,cover,author,title,cover_image,inventory_status,price_status) VALUES
(NULL,40.00,0,10,1,17,'HARD','J. K. Rowling','Harry Potter and the Half-Blood Prince',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,18,'HARD','J. K. Rowling','Harry Potter and the Deathly Hallows',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,19,'HARD','Robert James Waller','The Bridges of Madison County',NULL,'INSTOCK',NULL),
(NULL,40.00,0,10,1,20,'HARD','Gabriel García Márquez','One Hundred Years of Solitude (Cien años de soledad)',NULL,'INSTOCK',NULL);


