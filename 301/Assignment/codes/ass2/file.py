import os

assignment_files = {
    "1.py": """# Problem 1: Standard Scaling using NumPy

import numpy as np

data = np.array([10, 20, 30, 40, 50])

scaled = (data - data.mean()) / data.std()

print("Scaled Data:", scaled)
""",

    "2.py": """# Problem 2: Min-Max Normalization

import numpy as np

data = np.array([15, 25, 35, 45, 55])

normalized = (data - data.min()) / (data.max() - data.min())

print("Normalized Data:", normalized)
""",

    "3.py": """# Problem 3: Log Transformation

import numpy as np

data = np.array([1, 10, 100, 1000])

log_data = np.log10(data)

print("Log-transformed Data:", log_data)
""",

    "4.py": """# Problem 4: DataFrame Transformation using Pandas

import pandas as pd

df = pd.DataFrame({"Value": [1, 2, 3, 4, 5]})

df["Squared"] = df["Value"] ** 2

print(df)
""",

    "5.py": """# Problem 5: Handling Missing Data

import pandas as pd

df = pd.DataFrame({"Age": [20, 25, None, 30]})

df["Age"] = df["Age"].fillna(df["Age"].mean())

print(df)
""",

    "6.py": """# Problem 6: Detecting Missing Values

import pandas as pd

df = pd.DataFrame({"Age": [20, 25, None, 30]})

missing = df.isnull().sum()

print("Missing values per column:", missing)
""",

    "7.py": """# Problem 7: Label Encoding a Categorical Column

import pandas as pd

df = pd.DataFrame({"Gender": ["Male", "Female", "Female", "Male"]})

df["GenderEncoded"] = df["Gender"].astype("category").cat.codes

print(df)
""",

    "8.py": """# Problem 8: One-Hot Encoding

import pandas as pd

df = pd.DataFrame({"Gender": ["Male", "Female", "Female", "Male"]})

df = pd.get_dummies(df, columns=["Gender"])

print(df)
""",

    "9.py": """# Problem 9: Descriptive Statistics

import pandas as pd

df = pd.DataFrame({"Score": [50, 60, 70, 80, 90]})

print(df.describe())
""",

    "10.py": """# Problem 10: Correlation Matrix

import pandas as pd

df = pd.DataFrame({
    "Math": [85, 90, 78, 92],
    "Science": [88, 85, 82, 95],
    "English": [80, 78, 85, 88]
})

print(df.corr())
"""
}


for filename, code in assignment_files.items():
    with open(filename, "w", encoding="utf-8") as file:
        file.write(code)

print("Successfully created Assignment 2 files: 1.py to 10.py")