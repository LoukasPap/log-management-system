from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

from queries import *


app = FastAPI()

# JWT Configuration
SECRET_KEY = "4w6473wKC0ax53VMOWJJJ3P9R2 "  # Replace with a secure secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="login"))):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print("Received token:", token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("Decoded payload:", payload)

        return payload
    
    except JWTError as e:
        print("JWTError:", e)
        raise credentials_exception


@app.get("/me", response_model=dict)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    print(current_user)
    return current_user


@app.post("/login")
async def login(credentials: dict):
    userExists = check_user(credentials['username'], credentials['password'])

    if userExists == []:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Invalid credentials"
        )
    user={
        "username":userExists[0][0],
        "password":userExists[0][2],
        "fullname":userExists[0][1],
        "address":userExists[0][3],
        "email":userExists[0][4],
    }
    print(user)
    access_token = create_access_token(data=user)
    print(access_token)
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/register")
async def register(credentials: dict):
    user = check_user(credentials['username'])
    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already exists"
        )
    results = register_user(credentials)
    return {"token" : results}


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
