import pandas as pd
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import matplotlib.pyplot as plt

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

plot_acf(
    df['Sales'].dropna(),
    lags=20
)

plt.show()

plot_pacf(
    df['Sales'].dropna(),
    lags=20
)

plt.show()
