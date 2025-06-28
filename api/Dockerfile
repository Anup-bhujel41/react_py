# FROM python:3.12-alpine
FROM python:3.12-slim

# RUN apk add --no-cache build-base

RUN apt-get update && apt-get install -y build-essential python3-dev gfortran curl wget

WORKDIR /code

RUN python --version


COPY . .

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN pip install --upgrade pip setuptools wheel && \
    pip install -r requirements.txt

RUN python manage.py makemigrations  && \
    python manage.py migrate

EXPOSE 8009

CMD ["python", "manage.py", "runserver", "0.0.0.0:8009"]

# ENTRYPOINT [ "/entryppoint.sh" ]

