ClueMesh
========

Clues, connected.

ClueMesh is a local-first public profile discovery and identity clue correlation tool. It provides username string analysis, public profile discovery, metadata extraction, statistics, and evidence graphs through a macOS desktop app, web interface, and CLI.

Install and run
---------------

.. code-block:: bash

    git clone https://github.com/tsingke/cluemesh.git
    cd cluemesh
    npm ci
    npm run desktop

Python CLI
----------

.. code-block:: bash

    python3 app.py --username "johndoe" --top 50 --metadata

License
-------

ClueMesh is distributed under GNU AGPL-3.0. This repository incorporates and modifies third-party open-source code received under the same license. See ``NOTICE.md`` for details.
