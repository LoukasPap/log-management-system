CREATE TABLE LogRecord (
	logID VARCHAR(128), -- To store uuid6 ids generated with python
	logTimestamp TIMESTAMP,
	sourceIP VARCHAR(50),
	originFile VARCHAR(25),
	logType VARCHAR(10),
	PRIMARY KEY (logID)
);

CREATE TABLE AccessLog (
	logID VARCHAR(128),
	remoteName TEXT,
	userID TEXT,
	httpMethod VARCHAR(10),
	httpResponseStatus VARCHAR(5),
	httpResponseSize INT,
	userAgentString TEXT,
	PRIMARY KEY (logID),
	FOREIGN KEY (logID) REFERENCES LogRecord (logID)
);

CREATE TABLE ResourceRequest (
	logID VARCHAR(128),
	referer TEXT,
	resource TEXT,
	PRIMARY KEY (logID),
	FOREIGN KEY (logID) REFERENCES AccessLog (logID)
);

CREATE TABLE Block (
	logID VARCHAR(128),
	blockID VARCHAR(100),
	PRIMARY KEY (logID, blockID),
	FOREIGN KEY (logID) REFERENCES LogRecord (logID)
);

CREATE TABLE Destination (
	logID VARCHAR(128),
	destinationIP VARCHAR(100),
	PRIMARY KEY (logID, destinationIP),
	FOREIGN KEY (logID) REFERENCES LogRecord (logID)
);

CREATE TABLE LogSize (
	logID VARCHAR(128),
	logSize INT,
	PRIMARY KEY (logID),
	FOREIGN KEY (logID) REFERENCES LogRecord (logID)
);