FROM ubuntu:latest
LABEL authors="paulofiuza"

ENTRYPOINT ["top", "-b"]