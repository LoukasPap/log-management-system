CREATE INDEX timestampIndex ON logRecord
(
	logTimestamp
);

CREATE INDEX httpMethodIndex ON accessLog USING hash
(
	httpMethod
);

CREATE INDEX sizeIndex ON logSize
(
	logSize
);