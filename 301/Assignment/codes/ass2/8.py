# Problem 8: One-Hot Encoding

import pandas as pd

df = pd.DataFrame({"Gender": ["Male", "Female", "Female", "Male"]})

df = pd.get_dummies(df, columns=["Gender"])

print(df)
