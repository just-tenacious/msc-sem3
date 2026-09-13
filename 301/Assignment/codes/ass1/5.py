import pandas as pd

df = pd.read_csv("./data/data1.csv")

df.drop_duplicates(inplace=True)

print(df)
