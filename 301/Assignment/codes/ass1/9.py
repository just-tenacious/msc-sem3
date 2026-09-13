import pandas as pd

df = pd.read_csv("./data/data1.csv")

df.rename(columns={
    "EmpName": "Employee_Name",
    "Dept": "Department"
}, inplace=True)

df = df[[
    "Employee_ID",
    "Employee_Name",
    "Age",
    "Gender",
    "Salary",
    "Department"
]]

print(df.head())
