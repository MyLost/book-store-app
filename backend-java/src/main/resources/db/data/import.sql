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

INSERT INTO bookStore.books (number_of_books,price,promotion,genre_id,id,cover,author,title,cover_image,inventory_status,price_status) VALUES
(NULL,40.00,false,1,7,'HARD','J. R. R. Tolkien','The Hobbit',NULL,'INSTOCK',
NULL),
(NULL,40.00,false,1,8,'HARD',' 	Lewis Carroll','Alice''s Adventures in Wonderland',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,9,'HARD','C.S. Lewis','The Lion, the Witch and the Wardrobe',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,10,'HARD','H. Rider Haggard','She: A History of Adventure',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,11,'HARD','Dan Brown','The Da Vinci Code',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,12,'HARD','J. K. Rowling','Harry Potter and the Chamber of Secrets',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,13,'HARD','J. D. Salinger','The Catcher in the Rye',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,14,'HARD','J. K. Rowling','Harry Potter and the Prisoner of Azkaban',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,15,'HARD','J. K. Rowling','Harry Potter and the Goblet of Fire',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,16,'HARD','J. K. Rowling','Harry Potter and the Order of Phoenix',NULL,'INSTOCK',NULL);
INSERT INTO bookStore.books (number_of_books,price,promotion,genre_id,id,cover,author,title,cover_image,inventory_status,price_status) VALUES
(NULL,40.00,false,1,17,'HARD','J. K. Rowling','Harry Potter and the Half-Blood Prince',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,18,'HARD','J. K. Rowling','Harry Potter and the Deathly Hallows',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,19,'HARD','Robert James Waller','The Bridges of Madison County',NULL,'INSTOCK',NULL),
(NULL,40.00,false,1,20,'HARD','Gabriel García Márquez','One Hundred Years of Solitude (Cien años de soledad)',NULL,'INSTOCK',NULL);


-- INSERT INTO bookStore.categories (id,name,created_at,updated_at) VALUES
-- 	 ('bb440ae8-0bd8-11f0-abfa-a002a504e3e5','Books','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb45894c-0bd8-11f0-abfa-a002a504e3e5','Magazines & Newspapers','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb45bbc4-0bd8-11f0-abfa-a002a504e3e5','Stationery & Office Supplies','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb45fa1f-0bd8-11f0-abfa-a002a504e3e5','E-Books & Audiobooks','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb4632e4-0bd8-11f0-abfa-a002a504e3e5','Gift Items & Merchandise','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb468082-0bd8-11f0-abfa-a002a504e3e5','Board Games & Puzzles','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb46c850-0bd8-11f0-abfa-a002a504e3e5','School & Educational Supplies','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb4706e4-0bd8-11f0-abfa-a002a504e3e5','Art & Craft Supplies','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb473652-0bd8-11f0-abfa-a002a504e3e5','Writing Instruments','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb475902-0bd8-11f0-abfa-a002a504e3e5','Bookmarks & Book Accessories','2025-03-28 15:29:53','2025-03-28 15:29:53');
-- INSERT INTO bookStore.categories (id,name,created_at,updated_at) VALUES
-- 	 ('bb479596-0bd8-11f0-abfa-a002a504e3e5','Calendars & Planners','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb47c48a-0bd8-11f0-abfa-a002a504e3e5','Notebooks & Journals','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb47f618-0bd8-11f0-abfa-a002a504e3e5','Toys & Collectibles','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb4820f6-0bd8-11f0-abfa-a002a504e3e5','Music & CDs','2025-03-28 15:29:53','2025-03-28 15:29:53'),
-- 	 ('bb4852f7-0bd8-11f0-abfa-a002a504e3e5','Posters & Prints','2025-03-28 15:29:53','2025-03-28 15:29:53');
