# Problem 7: Label Encoding a Categorical Column

import pandas as pd

df = pd.DataFrame({"Gender": ["Male", "Female", "Female", "Male"]})

df["GenderEncoded"] = df["Gender"].astype("category").cat.codes

print(df)
