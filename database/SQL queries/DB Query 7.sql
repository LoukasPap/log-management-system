CREATE or replace FUNCTION query7 (specifiedSize INT)
	RETURNS TABLE (sourceIP VARCHAR(50), remoteName TEXT, userID TEXT, logTimestamp TIMESTAMP,
					httpMethod VARCHAR(10), resource TEXT, httpResponseStatus VARCHAR(5),
					httpResponseSize INT, referer TEXT, userAgentString TEXT) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		WITH smallerLogs as (
			SELECT *
			FROM AccessLog as al
			WHERE al.httpResponseSize < specifiedSize
		)
		SELECT lr.sourceIP, sl.remoteName, sl.userID, lr.logTimestamp, sl.httpMethod, rr.resource,
				sl.httpResponseStatus, sl.httpResponseSize, rr.referer, sl.userAgentString
		FROM smallerLogs as sl	
		JOIN LogRecord lr ON sl.logid=lr.logid
		JOIN ResourceRequest rr ON sl.logid=rr.logid;
	END;$$

-- Testing the function
SELECT * from query7(25000)
ORDER BY httpresponsesize DESC
