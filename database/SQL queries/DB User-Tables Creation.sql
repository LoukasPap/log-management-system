CREATE TABLE dbUser (
	username VARCHAR,
	fullname VARCHAR,
	userPassword VARCHAR,
	address VARCHAR,
	email VARCHAR,
	PRIMARY KEY (username)
);

CREATE TABLE userQueryHistory (
	username VARCHAR,
	queryDescription TEXT,
	queryTimestamp TIMESTAMP,
	FOREIGN KEY (username) REFERENCES dbUser (username)
);