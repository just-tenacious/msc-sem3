import pandas as pd

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

monthly_sales = df['Sales'].resample('ME').sum()

print(monthly_sales.head())
