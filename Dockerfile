FROM continuumio/miniconda3
LABEL version="1.0" \
      maintainer="abdalrahman.atieh@gmail.com" \
      project="P22 and P43"

ENV PATH="/root/miniconda3/bin:${PATH}"

# Installing all of system dependencies
RUN echo "Using Conda image" && \
    apt-get update -yq && \
    apt-get install -yq cmake g++ libgconf-2-4 libgles2-mesa-dev libglew-dev libglfw3-dev libglm-dev libxi6 sudo unzip vim zlib1g-dev libxkbcommon-x11-0 git python3 curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -yq nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/
RUN git clone https://github.com/abdalrahman01/p22_infinigen.git infinigen
WORKDIR /opt/infinigen


RUN conda init bash \
    && . ~/.bashrc \
    && conda create --name infinigen python=3.10 \
    && conda activate infinigen

# Installing everthing for Express server
# Copy server files
WORKDIR /opt/
COPY server/ ./server/
COPY server/package.json ./
COPY run.py .

COPY src/ ./src/
COPY src/components/ ./src/components/

COPY public/ ./public/ 
COPY package.json .
COPY package-lock.json .

# Expose port for Express server which we are using instead of RUN conda init 
EXPOSE 3000

WORKDIR /opt/server 
RUN npm install

WORKDIR /opt/
RUN npm install
#CMD ["bash", "-c", "source ~/.bashrc && conda init bash && conda activate infinigen && python /opt/run.py"]
CMD ["npm", "start"]

#docker run -p 9070:9070 