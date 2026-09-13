import pandas as pd

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

print(df.head())
