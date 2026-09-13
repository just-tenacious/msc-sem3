files = {

"1.py": '''import pandas as pd

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

print(df.head())
''',

"2.py": '''import pandas as pd
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
''',

"3.py": '''import pandas as pd

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

monthly_sales = df['Sales'].resample('ME').sum()

print(monthly_sales.head())
''',

"4.py": '''import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

df['Rolling_Mean'] = df['Sales'].rolling(window=3).mean()

df[['Sales','Rolling_Mean']].plot()

plt.title('3-Month Rolling Average')

plt.show()
''',

"5.py": '''import pandas as pd
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
''',

"6.py": '''import pandas as pd
from statsmodels.tsa.stattools import adfuller

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

result = adfuller(df['Sales'].dropna())

print("ADF Statistic:", result[0])
print("p-value:", result[1])
''',

"7.py": '''import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

df['Sales_Diff'] = df['Sales'].diff()

df[['Sales','Sales_Diff']].plot(
    subplots=True
)

plt.show()
''',

"8.py": '''import pandas as pd
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
''',

"9.py": '''import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

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
''',

"10.py": '''import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA

df = pd.read_csv("data_assignment6.csv", parse_dates=['Date'])

df.set_index('Date', inplace=True)

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

plt.title('Forecast vs Actual Sales')

plt.show()
'''

}


for filename, code in files.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(code)

print("All Assignment 6 Python files created successfully!")