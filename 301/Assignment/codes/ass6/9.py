import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

df = pd.read_csv(
    "data_assignment6.csv",
    parse_dates=['Date']
)

df.set_index('Date', inplace=True)

df = df.asfreq('D')

model = ARIMA(
    df['Sales'],
    order=(1,1,1)
)

model_fit = model.fit()

forecast = model_fit.forecast(
    steps=5
)

print("Next 5 forecasts:")
print(forecast)