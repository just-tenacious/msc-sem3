import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix

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

# Confusion matrix
cm = confusion_matrix(y, y_pred)

sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()
