import os

# Create folder for CSV files
os.makedirs("data", exist_ok=True)


files = {

"1.py": '''
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
data['join_date'] = data['join_date'].fillna(method='ffill')


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


print("\\nCleaned Dataset:")
print(data)

print("\\nDataset Information:")
print(data.info())

print("\\nStatistical Summary:")
print(data.describe())
''',


"2.py": '''
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
data['purchase_date'] = data['purchase_date'].fillna(
    method='ffill'
)


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


print("\\nCleaned Dataset:")
print(data)

print("\\nDataset Information:")
print(data.info())

print("\\nStatistical Summary:")
print(data.describe())
''',


"3.py": '''
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


# Load dataset
df = pd.read_csv("data/retail_sales.csv")

print("Initial Data:")
print(df.head())


# Handle missing values
df['Product'].fillna(
    "Unknown",
    inplace=True
)

df['Quantity'].fillna(
    df['Quantity'].median(),
    inplace=True
)

df['Price'].fillna(
    df['Price'].mean(),
    inplace=True
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


print("\\nSummary Statistics:")
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
''',


"4.py": '''
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
'''

}


for filename, code in files.items():

    with open(filename, "w", encoding="utf-8") as file:
        file.write(code)


print("Assignment 7 Python files created successfully!")
print("CSV files should be placed inside the 'data' folder.")