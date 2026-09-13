# Problem 10: Correlation Matrix

import pandas as pd

df = pd.DataFrame({
    "Math": [85, 90, 78, 92],
    "Science": [88, 85, 82, 95],
    "English": [80, 78, 85, 88]
})

print(df.corr())
