files = {

"1.py": '''# 1. Write a Python program to read a dataset and display basic summary statistics using Pandas.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

print(df.describe())
''',

"2.py": '''# 2. Write a Python program to display summary statistics of categorical columns in a dataset.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

print(df.describe(include="object"))
''',

"3.py": '''# 3. Write a Python program to calculate salary quantiles including Q1, median, and Q3 values.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

salary_quantiles = df["Salary"].quantile([0.25, 0.5, 0.75])

print(salary_quantiles)
''',

"4.py": '''# 4. Write a Python program to detect salary outliers using the Interquartile Range (IQR) method.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

Q1 = df["Salary"].quantile(0.25)

Q3 = df["Salary"].quantile(0.75)

IQR = Q3 - Q1

outliers = df[
    (df["Salary"] < Q1 - 1.5 * IQR) |
    (df["Salary"] > Q3 + 1.5 * IQR)
]

print("Outliers:")
print(outliers)
''',

"5.py": '''# 5. Write a Python program to visualize salary outliers using a boxplot.

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("data_assignment4.csv")

sns.boxplot(x=df["Salary"])

plt.title("Boxplot - Salary")

plt.show()
''',

"6.py": '''# 6. Write a Python program to detect salary outliers using the Z-Score method.

import pandas as pd
import numpy as np
from scipy import stats

df = pd.read_csv("data_assignment4.csv")

z_scores = np.abs(stats.zscore(df[["Salary"]]))

outliers = df[(z_scores > 3).any(axis=1)]

print("Outliers:")
print(outliers)
''',

"7.py": '''# 7. Write a Python program to handle salary outliers by applying the capping technique.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

cap_upper = df["Salary"].quantile(0.95)

cap_lower = df["Salary"].quantile(0.05)

df["Salary_Capped"] = df["Salary"].clip(
    lower=cap_lower,
    upper=cap_upper
)

print(df[["Salary", "Salary_Capped"]].head())
''',

"8.py": '''# 8. Write a Python program to calculate department-wise mean and standard deviation of salary.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

group_stats = df.groupby("Department")["Salary"].agg(
    ["mean", "std"]
)

print(group_stats)
''',

"9.py": '''# 9. Write a Python program to identify missing values present in each column of a dataset.

import pandas as pd

df = pd.read_csv("data_assignment4.csv")

missing_values = df.isnull().sum()

print("Missing values per column:")
print(missing_values)
''',

"10.py": '''# 10. Write a Python program to replace salary outliers with the median salary value.

import pandas as pd
import numpy as np

df = pd.read_csv("data_assignment4.csv")

Q1 = df["Salary"].quantile(0.25)

Q3 = df["Salary"].quantile(0.75)

IQR = Q3 - Q1

median_salary = df["Salary"].median()

df["Salary_Replaced"] = np.where(
    (df["Salary"] > Q3 + 1.5 * IQR) |
    (df["Salary"] < Q1 - 1.5 * IQR),
    median_salary,
    df["Salary"]
)

print(df[["Salary", "Salary_Replaced"]].head())
'''
}


for filename, code in files.items():
    with open(filename, "w", encoding="utf-8") as file:
        file.write(code)

print("Assignment 4 files (1.py to 10.py) created successfully.")