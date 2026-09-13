# Problem 2: Min-Max Normalization

import numpy as np

data = np.array([15, 25, 35, 45, 55])

normalized = (data - data.min()) / (data.max() - data.min())

print("Normalized Data:", normalized)
