import pandas as pd
from sklearn.linear_model import LogisticRegression

# Load dataset
df = pd.read_csv("data_assignment5.csv")

# Prepare data
X = df[['Age', 'Income']]
y = df['Purchased']

# Train model
model = LogisticRegression()
model.fit(X, y)

prediction = model.predict(pd.DataFrame([[30, 45000]], columns=['Age', 'Income']))
print("Prediction (1=Yes, 0=No):", prediction[0])
