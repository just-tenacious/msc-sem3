import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

df['Rolling_Mean'] = df['Sales'].rolling(window=3).mean()

df[['Sales','Rolling_Mean']].plot()

plt.title('3-Month Rolling Average')

plt.show()
