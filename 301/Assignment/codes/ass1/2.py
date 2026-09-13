import pandas as pd

df = pd.read_csv("./data/data1.csv")

missing = df.isnull().sum()
print("Missing values in each column:\n", missing)
