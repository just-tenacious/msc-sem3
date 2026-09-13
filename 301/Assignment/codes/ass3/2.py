# 2. Write a Python program to create a bar chart using Matplotlib for representing categorical data.

import matplotlib.pyplot as plt

categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]

plt.bar(categories, values, color='skyblue')

plt.title("Bar Chart")

plt.show()
