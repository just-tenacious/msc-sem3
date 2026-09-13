# 8. Write a Python program to calculate department-wise mean and standard deviation of salary.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

group_stats = df.groupby("Department")["Salary"].agg(
    ["mean", "std"]
)

print(group_stats)
