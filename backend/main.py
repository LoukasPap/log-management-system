from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

from queries import *

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    results = get_log_records(5)
    return templates.TemplateResponse("index.html", {"request": request, "result":results})


@app.get("/query1")
async def query1(start_date: str, end_date: str):
    results = lp_type_ranged(start_date, end_date)
    return {"msg" : results}


@app.get("/query2")
async def query2(start_date: str, end_date: str, type: str):
    results = lp_day_specified_type_ranged(start_date, end_date, type)
    return {"msg" : results}


@app.get("/query3")
async def query3(day: str):
    results = top_lp_src_day(day)
    return {"msg" : results}


@app.get("/query4")
async def query4(start_date: str, end_date: str):
    results = action_based_top5_blocks_ranged(start_date, end_date)
    return {"msg" : results}


@app.get("/query5")
async def query5(request: Request):
    results = referers_with_at_least_2_resources()
    return {"msg" : results}

@app.get("/query6")
async def query6(request: Request):
    return {"query":"query"}

@app.get("/query7")
async def query7(request: Request):
    return {"query":"query"}

@app.get("/query8")
async def query8(request: Request):
    return {"query":"query"}

@app.get("/query9")
async def query9(request: Request):
    return {"query":"query"}

@app.get("/query10")
async def query10(request: Request):
    return {"query":"query"}

@app.get("/query11")
async def query11(request: Request):
    return {"query":"query"}

@app.get("/query12")
async def query12(request: Request):
    return {"query":"query"}

@app.get("/query13")
async def query13(request: Request):
    return {"query":"query"}
