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




# Installing all of python dependencies
RUN conda init bash \
    && . ~/.bashrc \
    && conda create --name infinigen python=3.10 \
    && conda activate infinigen

# install blender and infinigen
WORKDIR /opt/
RUN git clone https://github.com/abdalrahman01/p22_infinigen.git infinigen
WORKDIR /opt/infinigen 

COPY install_blender.sh ./
RUN chmod +x install_blender.sh
RUN ./install_blender.sh || true

# Installing everthing for Express server
# Copy server files
WORKDIR /opt/
COPY server/ ./server/
COPY server/package.json ./

COPY src/ ./src/
COPY src/components/ ./src/components/

COPY public/ ./public/ 
COPY package.json .



# Expose port for Express server which we are using instead of RUN conda init 
EXPOSE 3000

WORKDIR /opt/server 
RUN npm install

WORKDIR /opt/
RUN npm install
CMD ["npm", "start"]
