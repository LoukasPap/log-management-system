from fastapi import FastAPI
from queries import getLogRecords

app = FastAPI()


@app.get("/")
async def root():
    results = getLogRecords(3)
    return {"msg": results}
