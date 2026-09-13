# 4. Write a Python program to create a pie chart using Matplotlib to represent percentage distribution among different categories.

import matplotlib.pyplot as plt

sizes = [30, 20, 25, 25]
labels = ['Python', 'Java', 'C++', 'JavaScript']

plt.pie(sizes, labels=labels, autopct='%1.1f%%')

plt.title("Pie Chart of Languages")

plt.show()
