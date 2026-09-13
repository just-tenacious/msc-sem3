import pandas as pd

df = pd.read_csv("./data/data1.csv")

df["Gender"] = df["Gender"].fillna(df["Gender"].mode()[0])

print(df)