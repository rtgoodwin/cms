FROM ghcr.io/craftcms/image:8.2 AS craft

USER root

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get update -y

RUN apt install -y nodejs mysql-client git postgresql-client

RUN apt-get -y install \
    libglib2.0-0 \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libatspi2.0-0

RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php

RUN php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

#RUN mv /app/* /app-bak/

# set the sockets and pid files to be writable by the appuser
RUN mkdir -p /var/log/nginx && chown -R appuser:appgroup /var/log/nginx
RUN chown -R appuser:appgroup /var/lib/nginx && touch /run/nginx.pid && chown -R appuser:appgroup /run/nginx.pid

RUN composer create-project -n craftcms/craft /tmp/app

RUN sed -i "s/create()/create()\n    ->requireMatchingUserAgentForSession(false)/g" /tmp/app/config/general.php

RUN rm -f /tmp/app/.env

RUN mv /tmp/app/* /app

RUN chown -R appuser /app
RUN chgrp -R appgroup /app

USER appuser