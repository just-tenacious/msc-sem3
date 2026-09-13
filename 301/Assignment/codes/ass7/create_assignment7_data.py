import os
import pandas as pd

# Create data folder
folder = "data"

if not os.path.exists(folder):
    os.makedirs(folder)

# 1. Employee Data
employee_data = pd.DataFrame([
    [1, "Rahul", "12-05-2021", 45000, "IT", "IT", 5000, 25],
    [2, "Priya", "18-07-2020", None, "HR", "HR", None, 28],
    [3, "Arjun", "23-03-2019", 52000, "Finance", "Finance", 7000, 32],
    [4, "Neha", None, 61000, "IT", "IT", 8000, None],
    [5, "Rahul", "12-05-2021", 45000, "IT", "IT", 5000, 25]
],
columns=[
    "id",
    "name",
    "join_date",
    "salary",
    "department",
    "department",
    "bonus",
    "age"
])

employee_data.to_csv(
    os.path.join(folder, "employee_data.csv"),
    index=False
)


# 2. Customer Sales Data
customer_sales = pd.DataFrame([
    ["C101", "Ramesh", "2023-01-10", 2500, "Electronics", "Electronics", 200, 30],
    ["C102", "Sita", "2023-01-12", None, "Clothing", "Clothing", 100, 25],
    ["C103", "Mohan", "2023-01-15", 4000, "Electronics", "Electronics", None, None],
    ["C104", "Priya", None, 1500, "Clothing", "Clothing", 50, 28],
    ["C105", "Ramesh", "2023-01-10", 2500, "Electronics", "Electronics", 200, 30]
],
columns=[
    "customer_id",
    "name",
    "purchase_date",
    "amount",
    "category",
    "category",
    "discount",
    "age"
])

customer_sales.to_csv(
    os.path.join(folder, "customer_sales.csv"),
    index=False
)


# 3. Retail Sales Data
retail_sales = pd.DataFrame([
    [101, "Laptop", "Electronics", 2, 55000, 110000, "2023-01-10"],
    [102, "Mobile", "Electronics", 1, 20000, 20000, "2023-01-12"],
    [103, None, "Clothing", 3, 1500, 4500, "2023-01-13"],
    [104, "Shoes", "Clothing", 2, 2500, 5000, "2023-01-15"],
    [105, "Laptop", "Electronics", 1, None, None, "2023-01-18"],
    [106, "Watch", "Accessories", 2, 3000, 6000, "2023-01-20"],
    [107, "Laptop", "Electronics", 2, 55000, 110000, "2023-01-10"],
    [108, "Mobile", "Electronics", 5, 20000, 100000, "2023-01-22"],
    [109, "Shirt", "Clothing", None, 1200, None, "2023-01-23"],
    [110, "Watch", "Accessories", 1, 3000, 3000, "2023-01-25"]
],
columns=[
    "OrderID",
    "Product",
    "Category",
    "Quantity",
    "Price",
    "Total_Sales",
    "Date"
])

retail_sales.to_csv(
    os.path.join(folder, "retail_sales.csv"),
    index=False
)


# 4. Sales Data
sales_data = pd.DataFrame([
    ["S101", "Ramesh", "Laptop", "Electronics", 2, 55000, 110000, "2023-01-10", "East"],
    ["S102", "Priya", "Mobile", "Electronics", 1, 20000, 20000, "2023-01-12", "West"],
    ["S103", "Mohan", "Shirt", "Clothing", 3, 1500, 4500, "2023-01-13", "East"],
    ["S104", "Neha", "Shoes", "Clothing", 2, 2500, 5000, "2023-01-15", None],
    ["S105", "Ramesh", "Laptop", "Electronics", 2, 55000, 110000, "2023-01-10", "East"],
    ["S106", "Anjali", "Watch", "Accessories", 1, None, None, "2023-01-18", "South"],
    ["S107", "Mohan", "Shirt", "Clothing", None, 1500, None, "2023-01-13", "East"]
],
columns=[
    "Sale_ID",
    "Customer",
    "Product",
    "Category",
    "Quantity",
    "Price",
    "Total_Sales",
    "Date",
    "Region"
])

sales_data.to_csv(
    os.path.join(folder, "sales_data.csv"),
    index=False
)


print("Assignment 7 CSV files created successfully inside 'data' folder.")