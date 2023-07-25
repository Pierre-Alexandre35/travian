FROM python:3.9

RUN mkdir /app
WORKDIR /app
COPY pyproject.toml /app 

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

COPY . /app

ENTRYPOINT ["uvicorn", "asgi:create_app", "--factory", "--host", "0.0.0.0"]
