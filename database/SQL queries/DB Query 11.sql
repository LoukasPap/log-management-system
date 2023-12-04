CREATE or replace FUNCTION query11 (startTimestamp TIMESTAMP, endTimestamp TIMESTAMP, wantedHttpMethod VARCHAR)
	RETURNS TABLE (IP_Address VARCHAR) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		WITH logsInRange AS (
			SELECT logID, sourceIP
			FROM LogRecord
			WHERE startTimestamp<=logTimestamp AND logTimestamp<=endTimestamp
		),
		wantedAccessLogs AS (
			SELECT logID
			FROM AccessLog
			WHERE httpMethod = wantedHttpMethod
		)
		SELECT DISTINCT sourceIP
		FROM logsInRange INNER JOIN wantedAccessLogs ON logsInRange.logID = wantedAccessLogs.logID;
	END;$$

-- Testing the function
SELECT * from query11('030927 000000', '090228 000000', 'POST')