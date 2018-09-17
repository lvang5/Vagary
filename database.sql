CREATE TABLE "person" (
    "id" serial NOT NULL,
    "email" varchar (255) NOT NULL,
    "password" varchar (255) NOT NULL,
    "first" varchar (255) NOT NULL,
    "last" varchar (255) NOT NULL ,
    "phone" integer NOT NULL ,
    "street_name" varchar (255) NOT NULL ,
    "city" varchar (255) NOT NULL,
    "state" varchar (255) NOT NULL ,
    "zipcode" integer NOT NULL ,
    "credit_card" integer NOT NULL,
    "ccv" integer NOT NULL ,
    "exp_month" integer NOT NULL,
    "exp_day" integer NOT NULL,
    CONSTRAINT Person_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

DROP TABLE "car";


CREATE TABLE "car" (
    "car_id" serial NOT NULL,
    "person_id" serial NOT NULL,
    "available" BOOLEAN DEFAULT 'true',
    "make" varchar(255) NOT NULL ,
    "model" varchar(255) NOT NULL ,
    "color" varchar(255) NOT NULL ,
    "year" integer NOT NULL ,
    "city" varchar(255) NOT NULL ,
    "state" varchar(255) NOT NULL ,
    "latitude" float4 NOT NULL ,
    "longitude" float4 NOT NULL ,
    CONSTRAINT car_pk PRIMARY KEY ("car_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "trip" (
    "id" serial NOT NULL,
    "car_id" serial NOT NULL,
    "person_id" serial NOT NULL,
    "start_time" TIMESTAMP NOT NULL,
    "end_time" TIMESTAMP NOT NULL,
    "cost" float4 NOT NULL,
    "review" varchar(255) NOT NULL,
    "rating" integer NOT NULL,
    
    CONSTRAINT trip_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);






ALTER TABLE "car" ADD CONSTRAINT "car_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");

ALTER TABLE "trip" ADD CONSTRAINT "trip_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");
ALTER TABLE "trip" ADD CONSTRAINT "trip_fk1" FOREIGN KEY ("car_id") REFERENCES "car"("car_id");



