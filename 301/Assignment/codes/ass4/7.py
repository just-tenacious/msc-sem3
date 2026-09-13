# 7. Write a Python program to handle salary outliers by applying the capping technique.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

df["Salary"] = pd.to_numeric(df["Salary"])

cap_upper = df["Salary"].quantile(0.95)

cap_lower = df["Salary"].quantile(0.05)

df["Salary_Capped"] = df["Salary"].clip(
    lower=cap_lower,
    upper=cap_upper
).astype(int)

print(df[["Salary", "Salary_Capped"]].head())