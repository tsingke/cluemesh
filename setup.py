#!/usr/bin/python
# -*- coding: utf-8 -*-

from setuptools import setup

with open('README.rst', 'r') as fh:
    long_description = fh.read()

setup(
    name='cluemesh',
    author='Qingke Zhang',
    author_email='tsingke@users.noreply.github.com',
    description="Local-first public profile discovery and identity clue correlation",
    long_description=long_description,
    version='1.0.0',
    license='AGPL-3.0',
    url='https://github.com/tsingke/cluemesh',
    packages=['cluemesh'],
    include_package_data=True,
    scripts=['cluemesh/cluemesh'],
    install_requires=['BeautifulSoup4', 'tld', 'termcolor', 'langdetect', 'requests', 'lxml', 'galeodes'],
    package_data={'cluemesh': ['data/*']},
    python_requires='>=3',
)
