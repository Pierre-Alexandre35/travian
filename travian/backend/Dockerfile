FROM python:3.9

RUN mkdir /app
WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

ENTRYPOINT ["uvicorn", "asgi:create_app", "--factory", "--host", "0.0.0.0"]
