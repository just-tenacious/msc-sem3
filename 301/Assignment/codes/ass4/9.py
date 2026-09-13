# 9. Write a Python program to identify missing values present in each column of a dataset.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

missing_values = df.isnull().sum()

print("Missing values per column:")
print(missing_values)
