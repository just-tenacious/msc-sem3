# 5. Write a Python program to visualize salary outliers using a boxplot.

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("data_assignment4.csv")

sns.boxplot(x=df["Salary"])

plt.title("Boxplot - Salary")

plt.show()
