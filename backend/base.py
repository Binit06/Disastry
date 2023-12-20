from flask import Flask, request
from flask_cors import CORS
import pickle
import pandas as pd

api = Flask(__name__)
CORS(api)
model = pickle.load((open('model.pkl', 'rb')))

@api.route('/predict', methods=["GET", "POST"])
def predict():
    date = request.args.get('formation')
    types = request.args.get('type')
    weather = request.args.get('weather')
    material = request.args.get('material')

    data = {
        "Type": int(types),
        "Target_Date": 2023 - int(date),
        "weather": int(weather),
        "material used quality": int(material),
        "C": 3
    }
    data["MaterialDegradation"] = abs(data["Type"] * (1 - data["Target_Date"] / 100))
    data["RelativeChange"] = ((data["Type"] - data["weather"]) / data["weather"])
    data["InteractionTerm"] = data["Type"] * data["Target_Date"] * data["weather"]

    df = pd.DataFrame(data=[data])
    print(df)
    predicion = model.predict(df)
    return str(predicion[0])