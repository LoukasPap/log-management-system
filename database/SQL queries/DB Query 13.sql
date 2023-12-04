CREATE or replace FUNCTION query13 (startTimestamp TIMESTAMP, endTimestamp TIMESTAMP)
	RETURNS TABLE (IP_Address VARCHAR) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		WITH logsInRange AS (
			SELECT logID, sourceIP
			FROM logRecord
			WHERE startTimestamp<=logTimestamp AND logTimestamp<=endTimestamp
		)
		SELECT sourceIP
		FROM logsInRange INNER JOIN accessLog ON logsInRange.logID = accessLog.logID
		GROUP BY sourceIP
		HAVING COUNT(DISTINCT httpMethod)=4;
	END;$$

-- Testing the function
SELECT * from query13('030927 000000', '090228 000000')