# 3. Write a Python program to create a histogram using Matplotlib to display the frequency distribution of data values.

import matplotlib.pyplot as plt

data = [12, 15, 22, 23, 23, 24, 25, 26, 28, 30, 35, 40]

plt.hist(data, bins=5, color='orange', edgecolor='black')

plt.title("Histogram")
plt.xlabel("Value")
plt.ylabel("Frequency")

plt.show()
