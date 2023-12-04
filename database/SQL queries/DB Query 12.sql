CREATE or replace FUNCTION query12 (startTimestamp TIMESTAMP, endTimestamp TIMESTAMP, 
									wantedHttpMethod1 VARCHAR, wantedHttpMethod2 VARCHAR)
	RETURNS TABLE (IP_Address VARCHAR) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		SELECT DISTINCT http1.IP_Address
		FROM
			query11(startTimestamp, endTimestamp, wantedHttpMethod1) as http1
			INNER JOIN query11(startTimestamp, endTimestamp, wantedHttpMethod2) as http2
			ON http1.IP_Address = http2.IP_Address;
	END;$$

-- Testing the function
SELECT * from query12('030927 000000', '090228 000000', 'POST', 'GET')