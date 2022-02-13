
CREATE TABLE "list" (
  "id" serial PRIMARY KEY,
  "todo" varchar(50) NOT NULL,
  "complete" BOOLEAN DEFAULT false
);

INSERT INTO "list" ("todo", "complete") 
VALUES ( 'Walk the dog', TRUE),
 ('Do luandry', FALSE), ('Go grocery shopping', TRUE), ('Clean the dishes', FALSE); 