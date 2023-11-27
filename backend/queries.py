from database import PgDatabase


def getLogRecords(n: int):
    with PgDatabase() as db:
        db.cursor.execute(
            """
            SELECT * FROM LogRecord LIMIT %s;
            """
        , (str(n), ))
        print('Got em')
        return db.cursor.fetchall()