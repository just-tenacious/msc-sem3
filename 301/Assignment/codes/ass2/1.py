# Problem 1: Standard Scaling using NumPy

import numpy as np

data = np.array([10, 20, 30, 40, 50])

scaled = (data - data.mean()) / data.std()

print("Scaled Data:", scaled)
