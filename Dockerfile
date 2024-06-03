FROM python:3.12.0
EXPOSE 8000
ENV PYTHONUNBUFFERED=1 \
    PORT=8000

RUN set -x \
    && useradd -m docker \
    && echo "docker:docker" | chpasswd

# Use user "docker" to run the build commands below and the server itself.
USER docker

ENV PATH "$PATH:/home/docker/.local/bin"

RUN pip install pip-tools
# Install the project requirements.
COPY requirements.txt /
RUN pip install -r /requirements.txt


# Use /app folder as a directory where the source code is stored.
WORKDIR /app
RUN chown docker:docker /app
