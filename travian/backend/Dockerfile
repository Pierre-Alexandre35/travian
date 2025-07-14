FROM python:3.8

WORKDIR /app

RUN apt-get update \
 && apt-get install -y postgresql-client \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Cloud Run expects your container to listen on PORT (8080)
ENV PORT 8080
EXPOSE 8080

# Use python -m uvicorn to start the app
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
