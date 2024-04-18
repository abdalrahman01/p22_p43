!/bin/bash 

python /opt/p22/p22.py > log.txt 2 >&1 &

cd /opt

npm start

# End of file