
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

x = np.linspace(0, 10, 20)

y = np.sin(x)

plt.figure(figsize=(8,5))

sns.lineplot(
    x=x,
    y=y,
    color='blue',
    label='Sine Wave'
)

plt.scatter(
    x,
    y,
    color='red',
    marker='o',
    label="Data Points"
)

plt.title(
    "Seaborn Line Plot with Matplotlib Scatter Overlay"
)

plt.xlabel(
    "X-axis"
)

plt.ylabel(
    "Y-axis"
)

plt.legend()

plt.show()
