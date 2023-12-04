CREATE or replace FUNCTION query5 ()
	RETURNS TABLE (referer_more_than_two text) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		SELECT referer
		FROM (
			SELECT referer, count(DISTINCT resource) as resourceCount
			FROM ResourceRequest
			GROUP BY referer
			)
		WHERE resourceCount>1;
	END;$$

-- Testing the function
SELECT * from query5()