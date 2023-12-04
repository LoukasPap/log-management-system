CREATE or replace FUNCTION query4 (startDate DATE, endDate DATE)
	RETURNS TABLE (block_id VARCHAR, actionCount BIGINT) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
	WITH logInRange as (
		SELECT logid, logtype
		FROM LogRecord
		WHERE startDate<=DATE(logTimestamp) AND endDate>=DATE(logTimestamp)
	)
	SELECT blockID, count(*) as typeCount
	FROM block INNER JOIN logInRange ON block.logID = logInRange.logID
	GROUP BY blockID
	ORDER BY typeCount DESC
	LIMIT 5;
	END;$$

-- Testing the function
SELECT * from query4('2008-11-09', '2008-11-10');