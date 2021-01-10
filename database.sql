CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY, 
	"task" VARCHAR(70) NOT NULL,
	"notes" VARCHAR(100) NOT NULL,
	"dueDate" VARCHAR(70),
	"complete" VARCHAR);
	
	
INSERT INTO "todo" ("task", "notes", "dueDate", "complete")
VALUES ('Trash', 'Take out the trash and recycling', '1-1-2021', 'incomplete');

INSERT INTO "todo" ("task", "notes", "dueDate", "complete")
VALUES ('Walk Dog', 'Take the dog on a walk', '1-1-2021', 'incomplete');
