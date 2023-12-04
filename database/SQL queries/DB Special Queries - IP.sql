CREATE or replace FUNCTION findIPLogs (IP_address VARCHAR)
	RETURNS TABLE (log_ID VARCHAR, log_Timestamp TIMESTAMP, source_IP VARCHAR, log_Type VARCHAR) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		WITH requestedLogIDs as (
			SELECT logID
			FROM destination
			WHERE IP_address = destinationIP
			UNION
			SELECT logID
			FROM logRecord
			WHERE IP_address = sourceIP
		)
		SELECT logRecord.LogID, logtimestamp, sourceIP, logtype
		FROM requestedLogIDs INNER JOIN logRecord on requestedLogIDs.logID=logRecord.logID;
	END;$$

-- Testing the function
SELECT * FROM findIPLogs('10.250.14.224:50010');