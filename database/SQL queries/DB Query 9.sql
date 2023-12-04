CREATE or replace FUNCTION query9 ()
	RETURNS TABLE (block VARCHAR(100)) LANGUAGE plpgsql 
	as $$
	BEGIN
	RETURN QUERY
		WITH ReplicatedAndServed as (
			SELECT logTimestamp, blockID, logType
			FROM LogRecord lr
			JOIN Block bl ON bl.logID=lr.logID
			WHERE logType in ('SERVED', 'REPLICATE'))
		SELECT DISTINCT rns.blockID
		FROM ReplicatedAndServed rns	
		JOIN (
			SELECT *
			FROM ReplicatedAndServed
			WHERE logType = 'REPLICATE') replicated
		ON replicated.blockID=rns.blockID
		WHERE rns.logType='SERVED' AND to_char(replicated.logTimestamp, 'dd:hh')=to_char(rns.logTimestamp, 'dd:hh');
	END;$$

-- Testing the function
SELECT * from query9()