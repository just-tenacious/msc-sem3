import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression

# Load dataset
df = pd.read_csv("data_assignment5.csv")

# Prepare data
X = df[['Age', 'Income']]
y = df['Purchased']

# Train model
model = LogisticRegression()
model.fit(X, y)

# Predict probabilities
probs = model.predict_proba(X)[:, 1]

# Plot histogram
plt.hist(probs, bins=10, color='green')
plt.title("Purchase Probability Distribution")
plt.xlabel("Probability")
plt.ylabel("Frequency")
plt.show()
