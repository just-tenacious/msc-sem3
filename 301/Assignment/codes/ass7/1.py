
import pandas as pd
import numpy as np

# Load dataset
data = pd.read_csv("data/employee_data.csv")

print("Original Data:")
print(data)


# Update missing numeric values with mean
data['salary'] = data['salary'].fillna(data['salary'].mean())
data['bonus'] = data['bonus'].fillna(data['bonus'].mean())
data['age'] = data['age'].fillna(data['age'].mean())


# Update missing join_date using forward fill
data['join_date'] = data['join_date'].ffill()

# Remove duplicate column
data = data.loc[:, ~data.columns.duplicated()]


# Remove duplicate rows
data = data.drop_duplicates()


# Rename columns
data.columns = [col.capitalize() for col in data.columns]


# Convert join_date into datetime
data['Join_date'] = pd.to_datetime(
    data['Join_date'],
    format='%d-%m-%Y'
)


# Convert salary and bonus into numeric
data['Salary'] = pd.to_numeric(data['Salary'])
data['Bonus'] = pd.to_numeric(data['Bonus'])


# Drop rows having more than 2 missing values
data = data.dropna(
    thresh=len(data.columns)-2
)


# Normalize salary
data['Salary_Normalized'] = (
    (data['Salary'] - data['Salary'].min()) /
    (data['Salary'].max() - data['Salary'].min())
)


print("\nCleaned Dataset:")
print(data)

print("\nDataset Information:")
print(data.info())

print("\nStatistical Summary:")
print(data.describe())
