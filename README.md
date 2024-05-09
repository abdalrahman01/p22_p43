# build the docker image 
```
git clone https://github.com/abdalrahman01/p22_p43.git

cd p22_p43

sudo docker build -t blender_infinigen_headless . 

sudo docker run --net=host --rm server 

```


# How to make a test run: 
in this repository there is a test python script `testScene.py` that you can run to test the blender installation. 

in the same dir:

```
/opt/infinigen/blender/blender -b -P /opt/infinigen/testScene.py
```

the output should be a file called `cup_dish.glb` in the same dir.