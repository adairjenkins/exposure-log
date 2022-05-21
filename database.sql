CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "target" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"description" TEXT);

CREATE TABLE "hierarchy" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"target_id" INT REFERENCES "target",
	"description" TEXT,
	"rating" REAL);
	
CREATE TABLE "exposure" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"hierarchy_id" INT REFERENCES "hierarchy" ON DELETE CASCADE,
	"date" DATE,
	"time" TIME,
	"duration" INT,
	"pre_suds" INT,
	"peak_suds" INT,
	"post_suds" INT,
	"notes" TEXT);
	
	
------- Sample data for fear of dogs hierarchy -----------------------------
INSERT INTO "target" ("user_id", "description")
	VALUES (1, 'Dogs');
	
INSERT INTO "hierarchy" ("user_id", "target_id", "description", "rating")
	VALUES (5, 1, 'Touch the face of a large dog', 10), 
           (5, 1, 'Touch the back of a large dog', 9.5), 
           (5, 1, 'Walk by an unleashed large dog without crossing the street', 9), 
           (5, 1, 'Stand one foot from a large dog on a leash', 8), 
           (5, 1, 'Sit on a bench in a dog park and watch dogs', 7.5), 
           (5, 1, 'Hold a puppy or small dog', 7.5), 
           (5, 1, 'Touch the face of a puppy or small dog', 7), 
           (5, 1, 'Stand one foot away from a puppy or small dog', 6.5), 
           (5, 1, 'Stand four feet from a large dog on a leash', 6.5), 
           (5, 1, 'Stand eight feet from a large dog on a leash', 5.5), 
           (5, 1, 'Stand four feet from a puppy or small dog on a leash', 5), 
           (5, 1, 'Go to the animal shelter and look at dogs behind a fence or glass', 4),  
           (5, 1, 'Watch video clips with close-up shots of dogs', 3);