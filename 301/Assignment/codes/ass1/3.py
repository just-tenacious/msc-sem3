import pandas as pd

df = pd.read_csv("./data/data1.csv")

df["Age"] = df["Age"].fillna(df["Age"].mean())

print(df)