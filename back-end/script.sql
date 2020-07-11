-- Database: swish_db

-- DROP DATABASE swish_db;

CREATE DATABASE swish_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Canada.1252'
    LC_CTYPE = 'English_Canada.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    balance numeric(6,2) NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    fname text COLLATE pg_catalog."default" NOT NULL,
    lname text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    uid uuid NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (uid)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;