files = {

"1.py": '''# 1. Write a Python program to create a line plot using Matplotlib and display the relationship between two variables with proper labels and grid.

import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [10, 20, 25, 30, 35]

plt.plot(x, y)

plt.title("Line Plot")
plt.xlabel("X Axis")
plt.ylabel("Y Axis")
plt.grid(True)

plt.show()
''',

"2.py": '''# 2. Write a Python program to create a bar chart using Matplotlib for representing categorical data.

import matplotlib.pyplot as plt

categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]

plt.bar(categories, values, color='skyblue')

plt.title("Bar Chart")

plt.show()
''',

"3.py": '''# 3. Write a Python program to create a histogram using Matplotlib to display the frequency distribution of data values.

import matplotlib.pyplot as plt

data = [12, 15, 22, 23, 23, 24, 25, 26, 28, 30, 35, 40]

plt.hist(data, bins=5, color='orange', edgecolor='black')

plt.title("Histogram")
plt.xlabel("Value")
plt.ylabel("Frequency")

plt.show()
''',

"4.py": '''# 4. Write a Python program to create a pie chart using Matplotlib to represent percentage distribution among different categories.

import matplotlib.pyplot as plt

sizes = [30, 20, 25, 25]
labels = ['Python', 'Java', 'C++', 'JavaScript']

plt.pie(sizes, labels=labels, autopct='%1.1f%%')

plt.title("Pie Chart of Languages")

plt.show()
''',

"5.py": '''# 5. Write a Python program to create a scatter plot using Matplotlib to visualize the relationship between two numerical variables.

import matplotlib.pyplot as plt

x = [5, 7, 8, 7, 2, 17, 2, 9, 4, 11]
y = [99, 86, 87, 88, 100, 86, 103, 87, 94, 78]

plt.scatter(x, y, color='red')

plt.title("Scatter Plot")
plt.xlabel("X")
plt.ylabel("Y")

plt.show()
''',

"6.py": '''# 6. Write a Python program to create a box plot using Seaborn for analyzing the distribution of numerical data.

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
''',

"7.py": '''# 7. Write a Python program to create a violin plot using Seaborn to visualize data distribution across different categories.

import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

sns.violinplot(x="day", y="total_bill", data=tips)

plt.title("Violin Plot of Bills by Day")

plt.show()
''',

"8.py": '''# 8. Write a Python program to create a heatmap using Seaborn for displaying data patterns using color intensity.

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
''',

"9.py": '''# 9. Write a Python program to create a pairplot using Seaborn to visualize relationships between multiple features of a dataset.

import seaborn as sns
import matplotlib.pyplot as plt

iris = sns.load_dataset("iris")

sns.pairplot(iris, hue="species")

plt.suptitle("Pairplot of Iris Dataset", y=1.02)

plt.show()
''',

"10.py": '''# 10. Write a Python program to create a count plot using Seaborn for displaying the frequency of records in different categories.

import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

sns.countplot(x="day", data=tips)

plt.title("Count of Records per Day")

plt.show()
'''
}


for filename, code in files.items():
    with open(filename, "w", encoding="utf-8") as file:
        file.write(code)

print("Assignment 3 files (1.py to 10.py) created successfully.")