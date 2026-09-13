# 10. Write a Python program to replace salary outliers with the median salary value.

import pandas as pd
import numpy as np

df = pd.read_csv("data_assignment4.csv")

Q1 = df["Salary"].quantile(0.25)

Q3 = df["Salary"].quantile(0.75)

IQR = Q3 - Q1

median_salary = df["Salary"].median()

df["Salary_Replaced"] = np.where(
    (df["Salary"] > Q3 + 1.5 * IQR) |
    (df["Salary"] < Q1 - 1.5 * IQR),
    median_salary,
    df["Salary"]
)

print(df[["Salary", "Salary_Replaced"]].head())
