from database import PgDatabase


def getLogRecords(n: int):
    with PgDatabase() as db:
        db.cursor.execute(
            """
            SELECT * FROM LogRecord LIMIT %s;
            """
        , (str(n), ))
        print('Works')
        return db.cursor.fetchall()