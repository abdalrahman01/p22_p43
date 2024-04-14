FROM continuumio/miniconda3
LABEL version="1.0" \
      maintainer="abdalrahman.atieh@gmail.com" \
      project="P22 and P43"

ENV PATH="/root/miniconda3/bin:${PATH}"
RUN echo "Using Conda image" && apt-get update -yq && apt-get install -yq cmake g++ libgconf-2-4  libgles2-mesa-dev  libglew-dev  libglfw3-dev  libglm-dev  libxi6  sudo  unzip  vim  zlib1g-dev libxkbcommon-x11-0 git python3 -y; 

WORKDIR /opt/
RUN git clone https://github.com/abdalrahman01/p22_infinigen.git infinigen
WORKDIR /opt/infinigen
COPY run.py .
COPY install.bash .
RUN conda init bash \
    && . ~/.bashrc \
    && conda create --name infinigen python=3.10 \
    && conda activate infinigen
#     && pip install -e .\
#     && FINIGEN_MINIMAL_INSTALL=True bash scripts/install/interactive_blender.sh

RUN conda init
CMD ["bash", "-c", "source ~/.bashrc && conda init bash && conda activate infinigen && python run.py"]
