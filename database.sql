
CREATE TABLE "list" (
  "id" serial PRIMARY KEY,
  "todo" varchar(50) NOT NULL,
  "complete" BOOLEAN DEFAULT false
);

INSERT INTO "list" ("todo", "complete") 
VALUES ( 'Walk the dog', TRUE),
 ('Do the luandry', FALSE), ('Clean the dishes', FALSE); 