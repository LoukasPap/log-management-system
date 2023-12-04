CREATE or replace FUNCTION register (username VARCHAR, fullname VARCHAR, userPassword VARCHAR,
									 address VARCHAR, email VARCHAR)
	RETURNS VOID LANGUAGE plpgsql 
	as $$
	BEGIN
		INSERT INTO dbUser
		VALUES(username, fullname, userpassword, address, email);
	END;$$

-- Testing the function
DO $$ BEGIN
    PERFORM register('test','test','test','test','test');
END $$;