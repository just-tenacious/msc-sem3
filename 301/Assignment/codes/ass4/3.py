# 3. Write a Python program to calculate salary quantiles including Q1, median, and Q3 values.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

salary_quantiles = df["Salary"].quantile([0.25, 0.5, 0.75])

print(salary_quantiles)
