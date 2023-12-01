from database import PgDatabase
from datetime import datetime
from datetime import datetime
from uuid6 import uuid7
import re
from helpers import *

def insert_access_log(log: str):
    fields = access_to_list(log)

    with PgDatabase() as db:
        try :
            current_uuid = str(uuid7())

            insert_query = """INSERT INTO LogRecord (logID, logTimestamp, sourceIP, originFile, logType) 
                            VALUES (%s, %s, %s, %s, %s);"""

            db.cursor.execute(insert_query, (current_uuid, fields[3], fields[0], 'ACCESS', 'ACCESS'))

            insert_query = """INSERT INTO AccessLog
                    (logID, remoteName, userID, httpMethod, httpResponseStatus, httpResponseSize, userAgentString) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s);"""
            db.cursor.execute(insert_query,
                            (current_uuid,
                            None if fields[1] == '-' else fields[1],
                            None if fields[2] == '-' else fields[2],
                            fields[4], fields[6], (None if fields[7] == '-' else fields[7]),
                            (None if fields[-1] == '-' else fields[-1])
                            ))

            insert_query = """INSERT INTO ResourceRequest 
                            (logID, referer, resource) 
                            VALUES (%s, %s, %s);"""
            db.cursor.execute(insert_query, (current_uuid, (None if fields[-2] == '-' else fields[-2]), fields[5]))

            db.connection.commit() 
            
            return "Inserted"       
    
        except Exception:
            return "Fail"


def insert_datasxceiver_log(log: str):
    fields = dataxceiver_to_log(log)
    with PgDatabase() as db:
        try :
            current_uuid = str(uuid7())

            insert_query = """INSERT INTO LogRecord (logID, logTimestamp, sourceIP, originFile, logType)
                           VALUES (%s, %s, %s, %s, %s);"""
            db.cursor.execute(insert_query, (current_uuid, fields[0], fields[3], 'DATAXCEIVER', fields[1].upper()))

            if (size := int(fields[-1])) != 0:
                insert_query = """INSERT INTO LogSize (logID, logSize)
                                VALUES (%s, %s);"""
                db.cursor.execute(insert_query, (current_uuid, size))

            # DESTINATION
            insert_query = """INSERT INTO Destination (logID, destinationIP)
                            VALUES (%s, %s);"""
            db.cursor.execute(insert_query, (current_uuid, fields[4]))

            # BLOCK
            insert_query = """INSERT INTO Block (logID, blockID)
                            VALUES (%s, %s);"""
            db.cursor.execute(insert_query, (current_uuid, fields[2]))

            db.connection.commit()
            
            return "Inserted"       
    
        except Exception:
            return "Fail"


def insert_fsnamesystem_log(log: str):
    fields = fsnamesystem_to_list(log)
    
    with PgDatabase() as db:
        try :

            current_uuid = str(uuid7())

            insert_query = """INSERT INTO LogRecord (logID, logTimestamp, sourceIP, originFile, logType)
                           VALUES (%s, %s, %s, %s, %s);"""

            db.cursor.execute(insert_query, (current_uuid, fields[0], fields[3], 'FSNAMESYSTEM', fields[1].upper()))

            for d in fields[4].split():
                insert_query = """INSERT INTO Destination (logID, destinationIP)
                                VALUES (%s, %s);"""

                db.cursor.execute(insert_query, (current_uuid, d))

            insert_query = """INSERT INTO Block (logID, blockID)
                            VALUES (%s, %s);"""
            db.cursor.execute(insert_query, (current_uuid, fields[2]))

            db.connection.commit()

            return "Inserted"       

        except Exception:
            return "Fail"


def register_user(creds: dict):
    print(creds['username'], creds['fullname'], creds['password'], creds['address'], creds['email'])
    with PgDatabase() as db:
        try :
            db.cursor.execute(
                """
                DO $$ BEGIN
                    PERFORM register(%s, %s, %s, %s, %s);
                END $$;
                """
            , (creds['username'], creds['fullname'], creds['password'], creds['address'], creds['email']))
            
            db.connection.commit()
            print('Works')
            return "Success"
        
        except Exception:
            return "Fail"


def check_user(username: str, password: str = ''):
    with PgDatabase() as db:
        if password != '':
            db.cursor.execute(
                """
                SELECT * FROM dbUser WHERE username=%s AND userPassword=%s;
                """
            , (username, password))
            res = db.cursor.fetchall()
        else:
            db.cursor.execute(
                """
                SELECT * FROM dbUser WHERE username=%s;
                """
            , (username, ))
            
            res = db.cursor.fetchall()
        return res


# query 1
# http://127.0.0.1:8001/query1?start_date=2005-10-20%2022:24:46&end_date=2009-12-20%2022:24:48
def lp_type_ranged(start_date: str, end_date: str):
    with PgDatabase() as db:
        db.cursor.callproc('query1', [convert_to_timestamp(start_date), 
                                      convert_to_timestamp(end_date)])
        res = db.cursor.fetchall()
        return res


# query 2
# http://127.0.0.1:8001/query2?start_date=2002-10-20%2022:24:46&end_date=2013-11-09%2021:20:55&type=ACCESS
def lp_day_specified_type_ranged(start_date: str, end_date: str, action_type: str):
    with PgDatabase() as db:
        db.cursor.callproc('query2', [convert_to_timestamp(start_date), 
                                      convert_to_timestamp(end_date), 
                                      action_type])
        res = db.cursor.fetchall()
        return res


# query 3
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


# query 6
# http://127.0.0.1:8001/query6
def second_most_common_resource():
    with PgDatabase() as db:
        db.cursor.callproc('query6')
        res = db.cursor.fetchall()
        return res


# query 7
# http://127.0.0.1:8001/query7?size=300
def access_logs_with_size_less_than(size: int):
    with PgDatabase() as db:
        db.cursor.callproc('query7', [size])
        res = db.cursor.fetchall()
        return res


# query 8
# http://127.0.0.1:8001/query8
def blocks_replicated_served_same_day():
    with PgDatabase() as db:
        db.cursor.callproc('query8')
        res = db.cursor.fetchall()
        return res


# query 9
# http://127.0.0.1:8001/query9
def blocks_replicated_served_same_day_hour():
    with PgDatabase() as db:
        db.cursor.callproc('query9')
        res = db.cursor.fetchall()
        return res


# query 10
# http://127.0.0.1:8001/query10
def access_logs_with_firefox_version():
    with PgDatabase() as db:
        db.cursor.callproc('query10')
        res = db.cursor.fetchall()
        return res


# query 11
# http://127.0.0.1:8001/query11?start_date=2005-10-20%2022:24:46&end_date=2009-12-20%2022:24:48&http_method=POST
def ips_with_1_httpmethod_ranged(start_date: str, end_date: str, http_method: str):
    with PgDatabase() as db:
        db.cursor.callproc('query11', [convert_to_timestamp(start_date), 
                                      convert_to_timestamp(end_date),
                                      http_method])
        res = db.cursor.fetchall()
        return res


# query 12
# http://127.0.0.1:8000/query12?start_date=2004-10-20%2022:24:46&end_date=2015-12-20%2022:24:48&http_method1=GET&http_method2=POST
def ips_with_2_httpmethods_ranged(start_date: str, end_date: str, http_method1: str, http_method2: str):
    with PgDatabase() as db:
        db.cursor.callproc('query12', [convert_to_timestamp(start_date), 
                                      convert_to_timestamp(end_date),
                                      http_method1,
                                      http_method2])
        res = db.cursor.fetchall()
        return res



def ips_with_any_4_httpmethods_ranged(start_date: str, end_date: str):
    with PgDatabase() as db:
        db.cursor.callproc('query13', [convert_to_timestamp(start_date), 
                                      convert_to_timestamp(end_date)])
        res = db.cursor.fetchall()
        return res


def logUserAction():
    pass


def insertLog():
    pass


def convert_to_timestamp(dt: str):
    datetime_object = datetime.strptime(dt, '%Y-%m-%d %H:%M:%S')
    return str(datetime_object.strftime("%y%m%d %H%M%S"))


