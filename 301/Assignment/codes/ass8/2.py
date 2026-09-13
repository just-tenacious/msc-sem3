
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
