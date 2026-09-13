import pandas as pd

df = pd.read_csv("./data/data1.csv")

median_salary = df["Salary"][df["Salary"] > 0].median()
df["Salary"] = df["Salary"].apply(lambda x: median_salary if x < 0 else x)

print(df)
