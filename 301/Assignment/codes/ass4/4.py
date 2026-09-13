# 4. Write a Python program to detect salary outliers using the Interquartile Range (IQR) method.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

Q1 = df["Salary"].quantile(0.25)

Q3 = df["Salary"].quantile(0.75)

IQR = Q3 - Q1

outliers = df[
    (df["Salary"] < Q1 - 1.5 * IQR) |
    (df["Salary"] > Q3 + 1.5 * IQR)
]

print("Outliers:")
print(outliers)
