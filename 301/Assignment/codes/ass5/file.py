files = {
    "1.py": '''import pandas as pd
from sklearn.linear_model import LinearRegression

# Load dataset
df = pd.read_csv("data_assignment5.csv")

# Prepare data
X = df[['Experience']]
y = df['Salary']

# Train model
model = LinearRegression()
model.fit(X, y)

# Display model parameters
print(f"Intercept: {model.intercept_}")
print(f"Coefficient: {model.coef_[0]}")
''',

    "2.py": '''import pandas as pd
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
predicted_salary = model.predict([[5]])
print(f"Predicted Salary for 5 years: {predicted_salary[0]}")
''',

    "3.py": '''import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Load dataset
df = pd.read_csv("data_assignment5.csv")

# Prepare data
X = df[['Experience']]
y = df['Salary']

# Train model
model = LinearRegression()
model.fit(X, y)

# Plot regression line
plt.scatter(X, y, color='blue')
plt.plot(X, model.predict(X), color='red')
plt.title("Experience vs Salary")
plt.xlabel("Years of Experience")
plt.ylabel("Salary")
plt.show()
''',

    "4.py": '''import pandas as pd
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
''',

    "5.py": '''import pandas as pd
from sklearn.linear_model import LogisticRegression

# Load dataset
df = pd.read_csv("data_assignment5.csv")

# Prepare data
X = df[['Age', 'Income']]
y = df['Purchased']

# Train model
model = LogisticRegression()
model.fit(X, y)

print("Coefficients:", model.coef_)
print("Intercept:", model.intercept_)
''',

    "6.py": '''import pandas as pd
from sklearn.linear_model import LogisticRegression

# Load dataset
df = pd.read_csv("data_assignment5.csv")

# Prepare data
X = df[['Age', 'Income']]
y = df['Purchased']

# Train model
model = LogisticRegression()
model.fit(X, y)

prediction = model.predict([[30, 45000]])
print("Prediction (1=Yes, 0=No):", prediction[0])
''',

    "7.py": '''import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

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

# Classification report
print(classification_report(y, y_pred))
''',

    "8.py": '''import pandas as pd
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
''',

    "9.py": '''import pandas as pd
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
''',

    "10.py": '''import pandas as pd
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
'''
}

for filename, code in files.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(code)

print(f"Created {len(files)} Python files successfully.")