import pandas as pd

df = pd.read_csv("./data/data1.csv")

df.rename(columns={
    "EmpName": "Employee_Name",
    "Dept": "Department"
}, inplace=True)

print(df.columns)
print(df.head())
