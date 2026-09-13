
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


# Load dataset
df = pd.read_csv("data/sales_data.csv")

print("Original Data:")
print(df)


# Fill missing numeric values
df['Quantity'] = df['Quantity'].fillna(
    df['Quantity'].mean()
)

df['Price'] = df['Price'].fillna(
    df['Price'].mean()
)

df['Total_Sales'] = df['Total_Sales'].fillna(
    df['Total_Sales'].mean()
)


# Fill missing category
df['Region'] = df['Region'].fillna(
    df['Region'].mode()[0]
)


# Remove duplicates
df = df.drop_duplicates()


# Keep required columns
df = df[
[
'Sale_ID',
'Customer',
'Product',
'Category',
'Quantity',
'Price',
'Total_Sales',
'Date'
]
]


# Rename columns
df.columns = [
col.capitalize()
for col in df.columns
]


# Convert date
df['Date'] = pd.to_datetime(
    df['Date']
)


# Numeric conversion
df['Quantity'] = pd.to_numeric(df['Quantity'])
df['Price'] = pd.to_numeric(df['Price'])
df['Total_sales'] = pd.to_numeric(df['Total_sales'])


# Encoding
df['Category_Code'] = (
    df['Category']
    .astype('category')
    .cat.codes
)


# Normalization
df['Total_Sales_Normalized'] = (
    (df['Total_sales'] - df['Total_sales'].min()) /
    (df['Total_sales'].max() - df['Total_sales'].min())
)


# Filter
filtered_data = df[
    df['Total_sales'] > 5000
]


print(filtered_data)

print(filtered_data.info())

print(filtered_data.describe())


sns.barplot(
    x='Category',
    y='Total_sales',
    data=filtered_data,
    estimator=np.sum
)

plt.title(
    "Total Sales per Category"
)

plt.show()
