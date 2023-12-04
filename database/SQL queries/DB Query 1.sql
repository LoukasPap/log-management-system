CREATE or replace FUNCTION query1 (startTimestamp TIMESTAMP, endTimestamp TIMESTAMP)
	RETURNS TABLE (log_type VARCHAR, log_count BIGINT) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		SELECT logType, count(*) as logCount
		FROM LogRecord
		WHERE startTimestamp<=logTimestamp AND logTimestamp<=endTimestamp
		GROUP BY logType
		ORDER BY logCount DESC;
	END;$$

-- Testing the function
SELECT * from query1('030927 000000', '050629 000000')