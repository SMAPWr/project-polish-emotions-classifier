FROM jupyter/scipy-notebook

USER root

RUN apt-get update && apt-get install -y apt-transport-https && apt-get install -y libmysqlclient-dev

USER jovyan

COPY requirements.txt ./
RUN pip install -r requirements.txt  && rm requirements.txt


ENV WORK_DIR ${HOME}/work
USER jovyan