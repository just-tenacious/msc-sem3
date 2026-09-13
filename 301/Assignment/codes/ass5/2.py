import pandas as pd
from sklearn.linear_model import LinearRegression

# Load dataset
df = pd.read_csv("data_assignment5.csv")

# Prepare data
X = df[['Experience']]
y = df['Salary']

# Train model
model = LinearRegression()
model.fit(X, y)

# Predict salary
predicted_salary = model.predict(pd.DataFrame([[5]], columns=['Experience']))
print(f"Predicted Salary for 5 years: {predicted_salary[0]}")