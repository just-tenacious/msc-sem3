# 9. Write a Python program to create a pairplot using Seaborn to visualize relationships between multiple features of a dataset.

import seaborn as sns
import matplotlib.pyplot as plt

iris = sns.load_dataset("iris")

sns.pairplot(iris, hue="species")

plt.suptitle("Pairplot of Iris Dataset", y=1.02)

plt.show()
