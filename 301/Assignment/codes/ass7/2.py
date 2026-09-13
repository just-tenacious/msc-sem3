
import pandas as pd
import numpy as np


# Load dataset
data = pd.read_csv("data/customer_sales.csv")

print("Original Data:")
print(data)


# Fill missing numeric values
data['amount'] = data['amount'].fillna(data['amount'].mean())
data['discount'] = data['discount'].fillna(data['discount'].mean())
data['age'] = data['age'].fillna(data['age'].mean())


# Fill missing date
data['purchase_date'] = data['purchase_date'].ffill()


# Remove duplicate column
data = data.loc[:, ~data.columns.duplicated()]


# Remove duplicate rows
data = data.drop_duplicates()


# Rename columns
data.columns = [
    col.capitalize()
    for col in data.columns
]


# Convert date
data['Purchase_date'] = pd.to_datetime(
    data['Purchase_date']
)


# Convert numeric columns
data['Amount'] = pd.to_numeric(data['Amount'])
data['Discount'] = pd.to_numeric(data['Discount'])


# Remove rows with excessive missing values
data = data.dropna(
    thresh=len(data.columns)-2
)


# Normalize amount
data['Amount_Normalized'] = (
    (data['Amount'] - data['Amount'].min()) /
    (data['Amount'].max() - data['Amount'].min())
)


print("\nCleaned Dataset:")
print(data)

print("\nDataset Information:")
print(data.info())

print("\nStatistical Summary:")
print(data.describe())
