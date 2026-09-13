import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("data_assignment5.csv")

# Prepare data
X = df[['Age', 'Income']]
y = df['Purchased']

# Train model
model = LogisticRegression()
model.fit(X, y)

# Predict
y_pred = model.predict(X)

# Accuracy
print("Accuracy:", accuracy_score(y, y_pred))
