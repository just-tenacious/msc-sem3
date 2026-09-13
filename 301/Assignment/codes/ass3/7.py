# 7. Write a Python program to create a violin plot using Seaborn to visualize data distribution across different categories.

import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

sns.violinplot(x="day", y="total_bill", data=tips)

plt.title("Violin Plot of Bills by Day")

plt.show()
