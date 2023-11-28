from database import PgDatabase
from datetime import datetime


def get_log_records(n: int):
    with PgDatabase() as db:
        db.cursor.execute(
            """
            SELECT * FROM LogRecord LIMIT %s;
            """
        , (str(n), ))
        print('Works')
        return db.cursor.fetchall()

# query1
# http://127.0.0.1:8001/query1?start_date=2005-10-20%2022:24:46&end_date=2009-12-20%2022:24:48
def lp_type_ranged(start_date: str, end_date: str):
    with PgDatabase() as db:
        db.cursor.callproc('query1', [convert_to_timestamp(start_date), 
                                      convert_to_timestamp(end_date)])
        res = db.cursor.fetchall()
        return res


# query2
# http://127.0.0.1:8001/query2?start_date=2002-10-20%2022:24:46&end_date=2013-11-09%2021:20:55&type=ACCESS
def lp_day_specified_type_ranged(start_date: str, end_date: str, action_type: str):
    with PgDatabase() as db:
        db.cursor.callproc('query2', [convert_to_timestamp(start_date), 
                                      convert_to_timestamp(end_date), 
                                      action_type])
        res = db.cursor.fetchall()
        return res


# query3
# http://127.0.0.1:8001/query3?day=2005-06-29
def top_lp_src_day(day: str):
    with PgDatabase() as db:
        db.cursor.callproc('query3', [day])
        res = db.cursor.fetchall()
        return res


# query 4
# http://127.0.0.1:8001/query4?start_date=2005-10-20%2022:24:46&end_date=2009-12-20%2022:24:48
def action_based_top5_blocks_ranged(start_date: str, end_date: str):
    with PgDatabase() as db:
        db.cursor.callproc('query4', [convert_to_timestamp(start_date), 
                                      convert_to_timestamp(end_date)])
        res = db.cursor.fetchall()
        return res
    # TODO fix: run in ~27 secs


# query 5
# http://127.0.0.1:8001/query5
def referers_with_at_least_2_resources():
    with PgDatabase() as db:
        db.cursor.callproc('query5')
        res = db.cursor.fetchall()
        return res


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


def convert_to_timestamp(dt: str):
    datetime_object = datetime.strptime(dt, '%Y-%m-%d %H:%M:%S')
    return str(datetime_object.strftime("%y%m%d %H%M%S"))
