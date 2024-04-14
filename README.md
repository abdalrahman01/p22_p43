# build the docker image 
```
git clone https://github.com/abdalrahman01/p22_p43.git

cd p22_p43

sudo docker build -t blender_infinigen_headless . 

sudo docker run blender_infinigen_headless:latest

sudo docker exec -it <container-id> /bin/bash
```

Now you are in the container and you need to manually install some additional stuff.

```
conda activate infinigen

INFINIGEN_MINIMAL_INSTALL=True bash scripts/install/interactive_blender.sh
```


## how to get the container-id 

```
sudo docker container ls -a
```

# How to make a test run: 
in this repository there is a test python script `testScene.py` that you can run to test the blender installation. 

in the same dir:

```
blender/blender -b -P testScene.py
```

the output should be a file called `cup_dish.glb` in the same dir.
