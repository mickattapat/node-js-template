docker rmi {user}/custom-app:1.0
docker buildx build --platform linux/amd64 -t {user}/custom-app:1.0 .
docker push {user}/custom-app:1.0