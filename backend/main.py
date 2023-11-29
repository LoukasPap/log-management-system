from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from queries import *


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def root():
    results = get_log_records(5)
    return {"data" : results}


@app.get("/query1")
async def query1(start_date: str, end_date: str):
    results = lp_type_ranged(start_date, end_date)
    formated_results = [{"type":i[0], "logs":i[1]} for i in results]

    return {"data" : formated_results}


@app.get("/query2")
async def query2(start_date: str, end_date: str, type: str):
    results = lp_day_specified_type_ranged(start_date, end_date, type)
    formated_results = [{"day":i[0], "logs":i[1]} for i in results]
    
    return {"data" : formated_results}


@app.get("/query3")
async def query3(day: str):
    results = top_lp_src_day(day)
    formated_results = [{"source_ip":i[0], "Most_common_log":i[1]} for i in results]

    return {"data" : formated_results}


@app.get("/query4")
async def query4(start_date: str, end_date: str):
    results = action_based_top5_blocks_ranged(start_date, end_date)
    formated_results = [{"Block_id":i[0], "Total_Actions":i[1]} for i in results]

    return {"data" : formated_results}


@app.get("/query5")
async def query5():
    results = referers_with_at_least_2_resources()
    formated_results = [{"Referer":i[0]} for i in results]

    return {"data" : formated_results}


@app.get("/query6")
async def query6():
    results = second_most_common_resource()
    formated_results = [{"Second_most_common":results[0][0]}]

    return {"data" : formated_results}


@app.get("/query7")
async def query7(size: int):
    results = access_logs_with_size_less_than(size)
    formated_results = [{
        "source_ip" : i[0],
        "remote_name" : i[1],
        "user_id" : i[2],
        "timestamp" : i[3],
        "http_method" : i[4],
        "http_response_status" : i[5],
        "http_response size" : i[6],
        "referer" : i[7],
        "user_agent_string" : i[8],
    } for i in results]

    return {"data" : formated_results}


@app.get("/query8")
async def query8():
    results = blocks_replicated_served_same_day()
    formated_results = [{"Block_id":i[0]} for i in results]

    return {"data" : formated_results}


@app.get("/query9")
async def query9():
    results = blocks_replicated_served_same_day_hour()
    formated_results = [{"Block_id":i[0]} for i in results]

    return {"data" : formated_results}

@app.get("/query10")
async def query10():
    results = access_logs_with_firefox_version()
    formated_results = [{"Log":i[0]} for i in results]

    return {"data" : formated_results}


@app.get("/query11")
async def query11(start_date: str, end_date: str, http_method: str):
    results = ips_with_1_httpmethod_ranged(start_date, end_date, http_method)
    formated_results = [{"IP_address":i[0]} for i in results]

    return {"data" : formated_results}

@app.get("/query12")
async def query12(start_date: str, end_date: str, http_method1: str, http_method2: str):
    results = ips_with_2_httpmethods_ranged(start_date, end_date, http_method1, http_method2)
    formated_results = [{"IP_address":i[0]} for i in results]

    return {"data" : formated_results}


@app.get("/query13")
async def query13(start_date: str, end_date: str):
    results = ips_with_any_4_httpmethods_ranged(start_date, end_date)
    formated_results = [{"IP_address":i[0]} for i in results]
    
    return {"data" : formated_results}
