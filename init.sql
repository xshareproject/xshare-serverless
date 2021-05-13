CREATE DATABASE share_pg;
-- CREATE USER db_admin WITH PASSWORD 'postgres@888';
GRANT ALL PRIVILEGES ON DATABASE "share_pg" to db_admin;


CREATE TABLE RecurringTransaction (
    id uuid PRIMARY KEY
);

CREATE TABLE Transaction (
    id uuid PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    description VARCHAR (50),
    totalAmount numeric,
    lastUpdated timestamp,
    recurringId uuid,
    CONSTRAINT fk_recurring
      FOREIGN KEY(recurringId) 
	  REFERENCES RecurringTransaction(id)
);

CREATE TYPE statusEnum AS ENUM ('accepted', 'declined', 'pending', 'completed', 'cancelled', 'delayed');

CREATE TABLE TransactionStatus (
    id uuid PRIMARY KEY,
    transactionId uuid,
    lenderId uuid,
    borrowerId uuid,
    amountOwned numeric,
    status statusEnum,
    CONSTRAINT fk_transaction
        FOREIGN KEY(transactionId)
        REFERENCES Transaction(id)
);
