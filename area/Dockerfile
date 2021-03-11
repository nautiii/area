FROM cirrusci/flutter:latest

WORKDIR /src
COPY . /src

RUN flutter upgrade
RUN flutter pub get

CMD flutter build apk --release