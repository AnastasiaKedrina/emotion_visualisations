from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import csv
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")


def load_csv(path):
    rows = []
    with open(path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            row["year"] = int(row["year"])
            row["count"] = int(row["count"])
            rows.append(row)
    return rows


@app.get("/term")
def get_term(term: str):
    path = f"data/{term}.csv"
    if not os.path.exists(path):
        return {"error": "dataset not found"}
    return {"term": term, "data": load_csv(path)}


@app.get("/")
def root():
    return {"message": "Go to /static/index.html"}
