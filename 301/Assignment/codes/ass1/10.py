import numpy as np

arr = np.array([
    [1, np.nan, 3],
    [4, 5, np.nan]
])

arr = np.nan_to_num(arr)

print(arr)
