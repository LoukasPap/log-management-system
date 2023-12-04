CREATE or replace FUNCTION login (usernameInput VARCHAR, userPasswordInput VARCHAR)
	RETURNS bool LANGUAGE plpgsql 
	as $$
	BEGIN
		RETURN EXISTS (
			SELECT *
			FROM dbUser
			WHERE dbUser.username=usernameInput AND dbUser.userPassword=userPasswordInput
		);
	END;$$

-- Testing the function
SELECT * FROM login('test', 'test');