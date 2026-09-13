import pandas as pd
from sklearn.linear_model import LinearRegression

# Load dataset
df = pd.read_csv("data_assignment5.csv")

# Prepare data
X = df[['Experience', 'Age']]
y = df['Salary']

# Train model
model = LinearRegression()
model.fit(X, y)

print("Coefficients:", model.coef_)
print("Intercept:", model.intercept_)
