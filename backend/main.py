from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

from queries import getLogRecords

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    results = getLogRecords(5)
    # print(results) # debug
    return templates.TemplateResponse("index.html", {"request": request, "result":results})


@app.get("/query1")
async def query1(request: Request):
    return {"query":"query"}

@app.get("/query2")
async def query2(request: Request):
    return {"query":"query"}

@app.get("/query3")
async def query3(request: Request):
    return {"query":"query"}

@app.get("/query4")
async def query4(request: Request):
    return {"query":"query"}

@app.get("/query5")
async def query5(request: Request):
    return {"query":"query"}

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
