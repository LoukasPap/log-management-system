CREATE or replace FUNCTION query3 (_date DATE)
	RETURNS TABLE (source_ip VARCHAR, log_type VARCHAR) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
	SELECT sourceIP, logType
	FROM (
		SELECT sourceIP, logType, 
				ROW_NUMBER() OVER (PARTITION BY sourceIP ORDER BY typeNumber) as top
		FROM (
			SELECT sourceIP, logType, count(*) as typeNumber
			FROM LogRecord
			WHERE DATE(logTimestamp)=_date
			GROUP BY sourceIP, logType)
		)
		WHERE top=1;
	END;$$

-- Testing the function
SELECT * from query3('2005-06-29')