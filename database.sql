CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY, 
	"task" VARCHAR(70) NOT NULL,
	"notes" VARCHAR(100) NOT NULL,
	"dateAdded" DATE,
	"complete" VARCHAR (10));
	
	
INSERT INTO "todo" ("task", "notes", "dateAdded", "complete")
VALUES ('Trash', 'Take out the trash and recycling', '1-1-2021', 'N/A');

INSERT INTO "todo" ("task", "notes", "dateAdded", "complete")
VALUES ('Walk Dog', 'Take the dog on a walk', '1-1-2021', 'N/A');