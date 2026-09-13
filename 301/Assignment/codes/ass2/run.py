import subprocess
import os

files = [f"{i}.py" for i in range(1, 11)]

for i, file in enumerate(files, start=1):
    print("=" * 80)
    print(f"OUTPUT OF {i}")
    print("=" * 80)

    if os.path.exists(file):
        result = subprocess.run(
            ["python", file],
            capture_output=True,
            text=True
        )

        if result.stdout:
            print(result.stdout.strip())

        if result.stderr:
            print("ERROR:")
            print(result.stderr.strip())

    else:
        print(f"{file} not found.")

    print("=" * 80)