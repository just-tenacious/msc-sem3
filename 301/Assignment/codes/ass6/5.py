import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose
import matplotlib.pyplot as plt

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

decomp = seasonal_decompose(
    df['Sales'],
    model='additive',
    period=12
)

decomp.plot()

plt.show()
