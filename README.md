# build the docker image

1. Download the repo
```
git clone https://github.com/abdalrahman01/p22_p43.git

cd p22_p43
```

2. set the IP in `./p22/p22.py` to IP for the LLM's host
Edit line [line#7](https://github.com/abdalrahman01/p22_p43/blob/d9b0a8f5c1925a4c248d15898c2180cc8fb67c75/p22/p22.py#L7) in `./p22/p22.py`

3. Build the docker image
```
sudo docker build -t p43_server . 
```

4. run the docker container
```
sudo docker run -d --rm -p 3000:3000 p43_server 
```

<!--
# How to make a test run: 
in this repository there is a test python script `testScene.py` that you can run to test the blender installation. 

in the same dir:

```
/opt/infinigen/blender/blender -b -P /opt/infinigen/testScene.py
```

the output should be a file called `cup_dish.glb` in the same dir. -->
