# main.py
from fastapi import FastAPI, HTTPException, File, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import bcrypt
import os
import shutil
import yfinance as yf
from datetime import date, timedelta
from typing import Optional
import joblib
import numpy as np
from datetime import datetime
import traceback
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import pandas as pd

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:3001"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Load Models
gold_model = joblib.load('gold_prediction.joblib')

# Db connection
# db = get_firestore_client()

class User(BaseModel):
    username: str
    full_name: str
    email:str
    contact: str
    password: str
    nic: str

class LoginUser(BaseModel):
    username: str
    password: str

class FaceID(BaseModel):
    username: str

# Use with firebase
# users_db = {}

# @app.post("/register")
# async def register_user(user: User):
#     user_ref = db.collection("users").document(user.username)
#     if user_ref.get().exists:
#         raise HTTPException(status_code=400, detail="Username already registered")

#     # Hash the password before storing it
#     hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
#     user_data = user.dict()
#     user_data["password"] = hashed_password.decode('utf-8')

#     user_ref.set(user_data)
#     return {"message": "User registered successfully", "user": user_data}

# @app.post("/login")
# async def login_user(user: LoginUser):
#     user_ref = db.collection("users").document(user.username)
#     user_doc = user_ref.get()

#     if not user_doc.exists:
#         raise HTTPException(status_code=400, detail="Invalid username or password")

#     user_data = user_doc.to_dict()
    
#     # Check the hashed password
#     if not bcrypt.checkpw(user.password.encode('utf-8'), user_data["password"].encode('utf-8')):
#         raise HTTPException(status_code=400, detail="Invalid username or password")

#     user_data.pop("password")  # Remove the password field from the response

#     return {"message": "Login successful", "user": user_data}


# Get Financial Details
@app.get("/market-data")
async def get_market_data():
    try:
        # Define ticker symbols for USD and Gold
        usd_ticker = "DX-Y.NYB"  # U.S. Dollar Index as an approximation
        gold_ticker = "GC=F"     # Gold Futures

        # Define the time period
        end_date = date.today()
        start_date = end_date - timedelta(days=30)

        # Fetch USD Index data
        usd_data = yf.download(usd_ticker, start=start_date, end=end_date, progress=False)
        usd_prices = usd_data['Close'].to_dict()  # Convert to dictionary for easy JSON serialization

        # Fetch Gold prices data
        gold_data = yf.download(gold_ticker, start=start_date, end=end_date, progress=False)
        gold_prices = gold_data['Close'].to_dict()  # Convert to dictionary for easy JSON serialization

        return {
            "usd_prices": usd_prices,
            "gold_prices": gold_prices
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching market data: {str(e)}")

@app.get("/gold-details")
async def get_gold_details(days: Optional[int] = Query(100, description="Number of days to retrieve data for")):
    """
    Fetches detailed information about gold prices over a specified period.
    Parameters:
    - days: Number of days to retrieve data for (default is 30 days).
    """
    try:
        # Define the ticker symbol for Gold Futures
        gold_ticker = "GC=F"

        # Calculate start and end dates
        end_date = date.today()
        start_date = end_date - timedelta(days=days)

        # Fetch gold data
        gold_data = yf.download(gold_ticker, start=start_date, end=end_date, progress=False)

        # Extract and structure data
        gold_details = {
            "open_prices": gold_data['Open'].to_dict(),
            "high_prices": gold_data['High'].to_dict(),
            "low_prices": gold_data['Low'].to_dict(),
            "close_prices": gold_data['Close'].to_dict(),
            "volumes": gold_data['Volume'].to_dict(),
        }

        # Calculate additional statistics
        # latest_close = gold_data['Close'][-1] if not gold_data.empty else None
        highest_price = gold_data['High'].max() if not gold_data.empty else None
        lowest_price = gold_data['Low'].min() if not gold_data.empty else None
        average_volume = gold_data['Volume'].mean() if not gold_data.empty else None

        # Add the statistics to the response
        statistics = {
            # "latest_close": latest_close,
            "highest_price": highest_price,
            "lowest_price": lowest_price,
            "average_volume": average_volume
        }

        return {
            "gold_details": gold_details,
            "statistics": statistics
        }

    except Exception as e:
        error_trace = traceback.format_exc()
        print(error_trace)
        raise HTTPException(status_code=500, detail=f"Error fetching gold details: {str(e)}")


class GoldPredictionInput(BaseModel):
    SPX: float
    USO: float
    SLV: float
    EUR_USD: float

class GoldPredictionDate(BaseModel):
    date: str

@app.post("/predict-gld")
async def predict_gld(data: GoldPredictionInput):
    try:
        # Convert input data to a NumPy array for prediction
        input_data = np.array([[data.SPX, data.USO, data.SLV, data.EUR_USD]])

        # Predict GLD value
        predicted_gld = gold_model.predict(input_data)[0]

        return {"predicted_GLD": predicted_gld}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
    
@app.post("/predict-gld-by-date")
async def predict_gld_by_date(data: GoldPredictionDate):
    try:
        # Parse the date
        date = datetime.strptime(data.date, "%Y-%m-%d")

        # Define the Yahoo Finance tickers
        tickers = {         # Silver Price ETF
            "EUR_USD": "EURUSD=X"  # EUR/USD exchange rate
        }

        # Fetch historical data for each ticker on the specified date
        prices = {}
        for key, ticker in tickers.items():
            stock_data = yf.download(ticker, start=data.date, end=data.date)
            if not stock_data.empty:
                print(stock_data)
                prices[key] = stock_data['Close'].iloc[0]
            else:
                raise HTTPException(status_code=404, detail=f"No data available for {key} on {data.date}")

        # Ensure all required data was retrieved
        if len(prices) != 4:
            raise HTTPException(status_code=500, detail="Failed to retrieve all required data.")

        # Prepare the data for prediction
        input_data = np.array([[prices["SPX"], prices["USO"], prices["SLV"], prices["EUR_USD"]]])

        # Predict GLD value
        predicted_gld = gold_model.predict(input_data)[0]

        return {
            "date": data.date,
            "input_data": prices,
            "predicted_GLD": predicted_gld
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


# Gold LSTM Futrue predictions
lstm_model = load_model('gold_dataset/lstm_gld_price_model.h5')

gold_ticker = "GC=F"
end_date = date.today()
start_date = end_date - timedelta(days=3650)  # Fetch 10 years of data
gold_data = yf.download(gold_ticker, start=start_date, end=end_date, progress=False)

gold_data.reset_index(inplace=True)
gold_data = gold_data[['Date', 'Open']]
gold_data.rename(columns={'Open': 'Price'}, inplace=True)

# Normalize data
scaler = MinMaxScaler()
gold_data['Price'] = scaler.fit_transform(gold_data['Price'].values.reshape(-1, 1))

window_size = 60  # Ensure this matches the LSTM training window

# Define request model
class PriceRequest(BaseModel):
    last_prices: list[float]
    future_days: int = 10

def predict_future_prices(last_prices, future_days=10):
    """
    Predict future gold prices using the LSTM model.
    
    :param last_prices: List of the last `window_size` prices.
    :param future_days: Number of days to predict.
    :return: List of predicted prices in original scale.
    """
    if len(last_prices) > window_size:
        last_prices = last_prices[-window_size:]  # Reduce to last `window_size` prices
    elif len(last_prices) < window_size:
        raise ValueError(f"Expected {window_size} prices, but got {len(last_prices)}.")

    last_prices = np.array(last_prices).reshape(-1, 1)
    last_prices = scaler.transform(last_prices)  # Normalize input data

    future_predictions = []
    input_sequence = list(last_prices[-window_size:])  # Use last `window_size` prices

    for _ in range(future_days):
        input_data = np.array(input_sequence).reshape(1, window_size, 1)  # Reshape for LSTM
        predicted_price = lstm_model.predict(input_data)[0, 0]  # Predict next value
        future_predictions.append(predicted_price)

        # Update input sequence for next iteration
        input_sequence.append([predicted_price])
        input_sequence.pop(0)  # Maintain sequence length

    # Inverse transform predictions to original scale
    future_predictions = scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1))
    
    return future_predictions.flatten().tolist()


@app.post("/predict_future_prices")
def predict_prices(request: PriceRequest):
    
    try:
        predictions = predict_future_prices(request.last_prices, request.future_days)
        # avg_value = sum(request.last_prices) / len(request.last_prices)
        # print(avg_value)

        # Add the average value to each predicted price
        adjusted_predictions = [p + 150 for p in predictions]
        return {"predicted_prices": adjusted_predictions}
    except ValueError as e:
        error_trace = traceback.format_exc()
        print(error_trace)
        raise HTTPException(status_code=400, detail=str(e))