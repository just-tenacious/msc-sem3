
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


# Load dataset
df = pd.read_csv("data/retail_sales.csv")

print("Initial Data:")
print(df.head())


# Handle missing values
df['Product'] = df['Product'].fillna("Unknown")

df['Quantity'] = df['Quantity'].fillna(
    df['Quantity'].median()
)

df['Price'] = df['Price'].fillna(
    df['Price'].mean()
)


# Recalculate sales
df['Total_Sales'] = (
    df['Quantity'] *
    df['Price']
)


# Remove duplicates
df.drop_duplicates(
    inplace=True
)


# Convert date
df['Date'] = pd.to_datetime(
    df['Date']
)


# Log transformation
df['Log_Sales'] = np.log1p(
    df['Total_Sales']
)


# Min-Max normalization
df['Price_Normalized'] = (
    (df['Price'] - df['Price'].min()) /
    (df['Price'].max() - df['Price'].min())
)


print("\nSummary Statistics:")
print(df.describe())


plt.figure(figsize=(6,4))
sns.barplot(
    x="Category",
    y="Total_Sales",
    data=df,
    estimator=np.sum
)

plt.title(
    "Total Sales by Category"
)

plt.show()


plt.figure(figsize=(6,4))
sns.histplot(
    df['Price'],
    bins=10,
    kde=True
)

plt.title(
    "Distribution of Product Prices"
)

plt.show()


plt.figure(figsize=(6,4))
sns.boxplot(
    x="Category",
    y="Price",
    data=df
)

plt.title(
    "Outlier Detection in Product Prices"
)

plt.show()
