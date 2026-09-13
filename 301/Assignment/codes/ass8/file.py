import os

files = {

"1.py": '''
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_theme(style="darkgrid")

x = [1, 2, 3, 4, 5]
y = [10, 12, 15, 18, 22]

plt.plot(
    x,
    y,
    marker='o',
    linestyle='-',
    color='blue',
    label="Trend"
)

plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.title("Matplotlib Plot with Seaborn Theme")
plt.legend()

plt.show()
''',

"2.py": '''
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

data = pd.DataFrame({
    'Year': [2018, 2019, 2020, 2021, 2022],
    'Sales': [100, 150, 200, 250, 300]
})

plt.figure(figsize=(8,5))

sns.lineplot(
    x='Year',
    y='Sales',
    data=data,
    marker='o'
)

plt.title(
    "Yearly Sales Growth",
    fontsize=14,
    fontweight='bold'
)

plt.xlabel(
    "Year",
    fontsize=12
)

plt.ylabel(
    "Total Sales",
    fontsize=12
)

plt.xticks(rotation=45)

plt.grid(
    True,
    linestyle='--'
)

plt.show()
''',

"3.py": '''
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

x = np.linspace(0, 10, 20)

y = np.sin(x)

plt.figure(figsize=(8,5))

sns.lineplot(
    x=x,
    y=y,
    color='blue',
    label='Sine Wave'
)

plt.scatter(
    x,
    y,
    color='red',
    marker='o',
    label="Data Points"
)

plt.title(
    "Seaborn Line Plot with Matplotlib Scatter Overlay"
)

plt.xlabel(
    "X-axis"
)

plt.ylabel(
    "Y-axis"
)

plt.legend()

plt.show()
''',

"4.py": '''
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

data = np.random.randn(1000)

plt.figure(figsize=(8,5))

sns.histplot(
    data,
    kde=True,
    bins=30,
    color='purple'
)

mean_value = np.mean(data)

plt.axvline(
    mean_value,
    color='red',
    linestyle='dashed',
    linewidth=2
)

plt.text(
    mean_value + 0.1,
    50,
    f'Mean: {mean_value:.2f}',
    color='red'
)

plt.title(
    "Distribution with Seaborn and Matplotlib Customization"
)

plt.xlabel(
    "Value"
)

plt.ylabel(
    "Frequency"
)

plt.show()
'''
}


for filename, code in files.items():
    with open(filename, "w", encoding="utf-8") as file:
        file.write(code)

print("All Python files created successfully.")