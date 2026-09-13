# 10. Write a Python program to create a count plot using Seaborn for displaying the frequency of records in different categories.

import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

sns.countplot(x="day", data=tips)

plt.title("Count of Records per Day")

plt.show()
