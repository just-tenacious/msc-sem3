import pandas as pd
import random
from datetime import datetime, timedelta

# Random seed for reproducibility
random.seed(42)

products = [
    ("Laptop", "Electronics", 55000),
    ("Mobile Phone", "Electronics", 25000),
    ("Tablet", "Electronics", 18000),
    ("Headphones", "Accessories", 3000),
    ("Smart Watch", "Accessories", 8000),
    ("Printer", "Electronics", 12000),
    ("Office Chair", "Furniture", 9000),
    ("Desk Table", "Furniture", 15000),
    ("Shoes", "Fashion", 2500),
    ("Clothing", "Fashion", 2000),
    ("Bag", "Fashion", 1800),
    ("Kitchen Appliance", "Home Appliances", 7000)
]

locations = [
    ("West", "Gujarat", "Ahmedabad"),
    ("West", "Maharashtra", "Mumbai"),
    ("West", "Maharashtra", "Pune"),
    ("North", "Delhi", "Delhi"),
    ("North", "Rajasthan", "Jaipur"),
    ("North", "Punjab", "Ludhiana"),
    ("South", "Karnataka", "Bangalore"),
    ("South", "Tamil Nadu", "Chennai"),
    ("South", "Telangana", "Hyderabad"),
    ("East", "West Bengal", "Kolkata")
]

channels = [
    "Online",
    "Retail Store",
    "Distributor"
]

customers = [
    "New",
    "Returning"
]


data = []

start_date = datetime(2024, 1, 1)

for i in range(730):

    date = start_date + timedelta(days=i)

    product, category, price = random.choice(products)

    region, state, city = random.choice(locations)

    quantity = random.randint(1, 10)

    discount = random.choice([0, 5, 10, 15, 20])

    sales_channel = random.choice(channels)

    customer_type = random.choice(customers)

    final_sales = (
        quantity *
        price *
        (1 - discount / 100)
    )

    # Add seasonal variation
    if date.month in [10, 11, 12]:
        final_sales *= random.uniform(1.15, 1.40)

    elif date.month in [6, 7]:
        final_sales *= random.uniform(0.85, 0.95)

    final_sales = round(final_sales, 2)

    data.append([
        1001 + i,
        date.strftime("%Y-%m-%d"),
        product,
        category,
        region,
        state,
        city,
        quantity,
        price,
        discount,
        sales_channel,
        customer_type,
        final_sales
    ])


columns = [
    "Order_ID",
    "Date",
    "Product_Name",
    "Category",
    "Region",
    "State",
    "City",
    "Quantity_Sold",
    "Unit_Price",
    "Discount_Percentage",
    "Sales_Channel",
    "Customer_Type",
    "Sales"
]


df = pd.DataFrame(data, columns=columns)

df.to_csv(
    "data_assignment6.csv",
    index=False
)

print("data_assignment6.csv created successfully!")
print("Total Records:", len(df))
print(df.head())