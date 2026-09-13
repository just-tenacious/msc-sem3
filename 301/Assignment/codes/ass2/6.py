# Problem 6: Detecting Missing Values

import pandas as pd

df = pd.DataFrame({"Age": [20, 25, None, 30]})

missing = df.isnull().sum()

print("Missing values per column:", missing)
