CREATE or replace FUNCTION query10 ()
	RETURNS TABLE (firefoxLogID VARCHAR, userAgentSTR TEXT) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		SELECT logID, userAgentString
		FROM AccessLog
		WHERE userAgentString ILIKE '%Firefox%';
	END;$$

-- Testing the function
SELECT * from query10()