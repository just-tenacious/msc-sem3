import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

df['Sales'].plot(
    title='Sales Over Time',
    figsize=(10,4)
)

plt.ylabel('Sales')
plt.grid(True)

plt.show()
