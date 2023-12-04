CREATE or replace FUNCTION query2 (startTimestamp TIMESTAMP, endTimestamp TIMESTAMP, actionType VARCHAR)
	RETURNS TABLE (_date DATE, total_logs BIGINT) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		SELECT DATE(logTimestamp) as extracted_date, count(*) as total_logs
		FROM LogRecord
		WHERE startTimestamp<=logTimestamp AND logTimestamp<=endTimestamp AND logtype=actionType
		GROUP BY extracted_date
		ORDER BY extracted_date;
	END;$$

-- Testing the function
SELECT * from query2('030927 000000', '090228 000000', 'ACCESS')