import subprocess
import os
import sys


files = [
    "1.py",
    "2.py",
    "3.py",
    "4.py"
]


for i, file in enumerate(files, start=1):

    print("=" * 80)
    print(f"OUTPUT OF {i}: {file}")
    print("=" * 80)

    if os.path.exists(file):

        result = subprocess.run(
            [sys.executable, file],
            capture_output=True,
            text=True
        )

        if result.stdout:
            print(result.stdout)

        if result.stderr:
            print("ERROR / WARNING:")
            print(result.stderr)

        print("Exit Code:", result.returncode)

    else:

        print(f"{file} not found.")

    print("=" * 80)