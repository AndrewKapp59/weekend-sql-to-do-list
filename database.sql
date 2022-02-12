CREATE TABLE "koala" (
  "id" serial PRIMARY KEY,
  "name" varchar(20) NOT NULL,
  "age" INTEGER,
  "gender" varchar(1) NOT NULL, 
  "ready_to_transfer" BOOLEAN DEFAULT false,
  "notes" varchar(255)
);

INSERT INTO "koala" ("name", "age", "gender", "ready_to_transfer", "notes") 
VALUES ( 'Scotty', 4, 'M', TRUE, 'Born in Guatemala'),
 ('Jean', 5, 'F', TRUE, 'Allergic to lots of lava'), 
 ('Ororo',  7, 'F', FALSE, 'Loves listening to Paula (Abdul)'),
 ('Logan', 15, 'M', FALSE, 'Loves to sauna'),
 ('Charlie', 9, 'm', TRUE, 'Favorite band is Nirvana'),
 ('Betsy', 4, 'F', TRUE, 'Has a pet iguana');
 
 SELECT * FROM "koala";
 