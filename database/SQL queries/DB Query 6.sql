CREATE or replace FUNCTION query6 ()
	RETURNS TABLE (second_common_resource text) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		SELECT resource
		FROM (
			SELECT resource,
				ROW_NUMBER() OVER (ORDER BY resourceRequestCount) as topResource
			FROM (
				SELECT resource, count(*) as resourceRequestCount
				FROM ResourceRequest
				GROUP BY resource
			)
		)
		WHERE topResource=2;
	END;$$

-- Testing the function
SELECT * from query6()