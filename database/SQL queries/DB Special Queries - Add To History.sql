CREATE or replace FUNCTION AddToHistory (username VARCHAR, queryDescription TEXT, queryTimestamp TIMESTAMP)
	RETURNS VOID LANGUAGE plpgsql 
	as $$
	BEGIN
		INSERT INTO UserQueryHistory
		VALUES(username, queryDescription, queryTimestamp);
	END;$$

-- Testing the function
DO $$ BEGIN
    PERFORM AddToHistory('test','test','050505 000000');
END $$;