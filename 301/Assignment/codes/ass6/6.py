import pandas as pd
from statsmodels.tsa.stattools import adfuller

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

result = adfuller(df['Sales'].dropna())

print("ADF Statistic:", result[0])
print("p-value:", result[1])
