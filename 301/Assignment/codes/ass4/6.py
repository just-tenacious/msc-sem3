# 6. Write a Python program to detect salary outliers using the Z-Score method.

import pandas as pd
import numpy as np
from scipy import stats

df = pd.read_csv("data_assignment4.csv")

z_scores = np.abs(stats.zscore(df[["Salary"]]))

outliers = df[(z_scores > 3).any(axis=1)]

print("Outliers:")
print(outliers)
