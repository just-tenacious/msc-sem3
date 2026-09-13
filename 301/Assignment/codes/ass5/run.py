import subprocess
import os
import sys

files = [f"{i}.py" for i in range(1, 11)]

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
            print(result.stdout.strip())

        if result.stderr:
            print("\nERROR:")
            print(result.stderr.strip())

        print(f"\nExit Code: {result.returncode}")

    else:
        print(f"{file} not found.")

    print("=" * 80)
    print()