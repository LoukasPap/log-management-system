# Log Management System - DBMS Project 1

This is the first project for the MSc course  __Database Management System (M149)__ of the winter semester.

## Back-end
Inside the _backend/ folder_:


To activate virtual environment:
```bash
$ source venv/Scripts/activate
```

To start backend server:
```bash
$ uvicorn main:app --reload
```

To connect to your database, create an `.env` file with the properties of your database, like this:
```bash
export DB_HOST=<host> (probably, localhost)
export DB_PORT=<port> (probably, 5432)
export DB_USERNAME=<username>
export DB_PASSWORD=<password>
export DB_NAME=LogDB
```