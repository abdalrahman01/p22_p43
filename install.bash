#!/bin/bash 

conda activate infinigen

cd infinigen
# check if current folder is 'infinigen'
if [ ! -d "infinigen" ]; then
    echo "Please run this script from the 'infinigen' folder"
    exit 1
fi

INFINIGEN_MINIMAL_INSTALL=True bash scripts/install/interactive_blender.sh
