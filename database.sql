
CREATE TABLE "list" (
  "id" serial PRIMARY KEY,
  "todo" varchar(50) NOT NULL,
  "complete" BOOLEAN DEFAULT false,
  "date" varchar(200) DEFAULT null
);

INSERT INTO "list" ("todo", "complete", "date") 
VALUES ( 'Walk the dog', False, null),
 ('Do the luandry', FALSE, null), ('Clean the dishes', FALSE, null); 