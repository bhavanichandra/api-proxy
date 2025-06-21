# Effortless Local Development with a Proxy Service

A simple proxy service is only used for local development, so there's no need to worry much about security aspects.

## Usage

To use this proxy service, you can pull the Docker image using this command:

```bash
docker pull bhavanichandra9/api-proxy
```

To run the service, use the following command:

```bash
docker run -e API_PORT='8084' -e API_TARGET_URL='<https://jsonplaceholder.typicode.com>' -p 8084:8084 bhavanichandra9/api-proxy:1.0.0
```
