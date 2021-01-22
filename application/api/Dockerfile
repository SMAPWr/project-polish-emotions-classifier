FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8 PYTHONUNBUFFERED=1

EXPOSE 8008

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt  && rm requirements.txt

COPY ./app ./app
CMD uvicorn app.main:app --reload --port 8008 --host 0.0.0.0