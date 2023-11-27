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
    

def query1():
    pass

def query2():
    pass

def query3():
    pass

def query4():
    pass

def query5():
    pass

def query6():
    pass

def query7():
    pass

def query8():
    pass

def query9():
    pass

def query10():
    pass

def query11():
    pass

def query12():
    pass

def query13():
    pass

def logUserAction():
    pass

def insertLog():
    pass