# 6. Write a Python program to create a box plot using Seaborn for analyzing the distribution of numerical data.

import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Math": [88, 85, 90, 87, 93],
    "Science": [92, 90, 85, 88, 91]
})

sns.boxplot(data=df)

plt.title("Box Plot")

plt.show()
