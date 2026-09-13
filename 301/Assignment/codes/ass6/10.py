import pandas as pd
import matplotlib.pyplot as plt
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

plt.plot(
    df['Sales'],
    label='Actual'
)

plt.plot(
    forecast.index,
    forecast,
    label='Forecast',
    color='red'
)

plt.legend()

plt.title("Forecast vs Actual Sales")

plt.show()