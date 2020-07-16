FROM frolvlad/alpine-glibc:alpine-3.11_glibc-2.31

ENV DENO_VERSION=1.2.0

RUN apk add --virtual .download --no-cache curl \
  && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
  --output deno.zip \
  && unzip deno.zip \
  && rm deno.zip \
  && chmod 777 deno \
  && mv deno /bin/deno \
  && apk del .download

ENV PROJECT_DIR /home/app

RUN mkdir $PROJECT_DIR

WORKDIR $PROJECT_DIR

COPY src/ $PROJECT_DIR/src

EXPOSE 3000

CMD [ "deno", "run", "--allow-net", "src/server.ts" ]
