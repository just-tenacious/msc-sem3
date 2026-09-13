# 1. Write a Python program to read a dataset and display basic summary statistics using Pandas.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

print(df.describe())
