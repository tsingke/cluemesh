#!/bin/bash
echo "ClueMesh pip package creator"
echo "[x] Deleting pip-cluemesh"
[[ -d pip-cluemesh ]] && rm -r pip-cluemesh
echo "[x] Making pip-cluemesh"
mkdir -p pip-cluemesh/cluemesh
echo "[x] Copying app.py, setup.py, README.rst & README.rst"
cp app.py pip-cluemesh/cluemesh/__main__.py
cat >>pip-cluemesh/cluemesh/__init__.py <<EOL
#!/usr/bin/env python
from .__main__ import main_logic
from .__main__ import ClueMesh
EOL
cat >>pip-cluemesh/cluemesh/cluemesh <<EOL
#!/usr/bin/env python
from importlib import import_module
if __name__ == '__main__':
	module = import_module("cluemesh")
	module.main_logic()
EOL
cp setup.py pip-cluemesh/setup.py
cp README.rst pip-cluemesh/README.rst
echo "[x] Copying data folder"
cp -r data pip-cluemesh/cluemesh/
cd pip-cluemesh/
echo "[x] Checking setup.py"
python3 setup.py check -r -s
echo "[x] Creating pypi Package"

python3 setup.py sdist bdist_wheel 2>stderr.log 1>stdout.log

 if grep -q "error:" stderr.log
	then
		echo "[x] Creating pypi failed.."
		cat stderr.log
	else
		echo "[x] pypi Package was created successfully"
		read -p "Do you want to upload? (y/n)?" USER_INPUT
		if [ "$USER_INPUT" = "y" ]; then
			echo "[x] Uploading pypi Package"
			twine upload dist/*
		fi
 fi

echo "[x] Cleaning.."
[[ -d pip-cluemesh ]] && rm -r pip-cluemesh
echo "[x] Done"
