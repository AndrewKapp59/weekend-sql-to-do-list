
CREATE TABLE "list" (
  "id" serial PRIMARY KEY,
  "todo" varchar(20) NOT NULL,
  "complete" BOOLEAN DEFAULT false
);

INSERT INTO "list" ("todo", "complete") 
VALUES ( 'Walk the dog', TRUE), ('Do the luandry', FALSE), ('Clean the dishes', FALSE); 
 