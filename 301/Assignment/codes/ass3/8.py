# 8. Write a Python program to create a heatmap using Seaborn for displaying data patterns using color intensity.

import seaborn as sns
import matplotlib.pyplot as plt

data = sns.load_dataset("flights").pivot(
    index="month",
    columns="year",
    values="passengers"
)

sns.heatmap(data, cmap="YlGnBu", annot=True)

plt.title("Heatmap of Passengers")

plt.show()
