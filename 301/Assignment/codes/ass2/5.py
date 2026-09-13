# Problem 5: Handling Missing Data

import pandas as pd

df = pd.DataFrame({"Age": [20, 25, None, 30]})

df["Age"] = df["Age"].fillna(df["Age"].mean())

print(df)
