# 2. Write a Python program to display summary statistics of categorical columns in a dataset.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

print(df.describe(include="object"))
