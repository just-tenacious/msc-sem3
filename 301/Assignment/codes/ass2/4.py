# Problem 4: DataFrame Transformation using Pandas

import pandas as pd

df = pd.DataFrame({"Value": [1, 2, 3, 4, 5]})

df["Squared"] = df["Value"] ** 2

print(df)
