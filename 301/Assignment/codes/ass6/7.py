import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

df['Sales_Diff'] = df['Sales'].diff()

df[['Sales','Sales_Diff']].plot(
    subplots=True
)

plt.show()
