FROM php:7.3.0-apache

COPY . /var/www/html
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apachectl restart
RUN a2enmod rewrite


ENV EMR_API_URL=$EMR_API_URL
ENV BASE_URL=$BASE_URL
ENV DB_URL=$DB_URL
ENV DB_USER_NAME=$DB_USER_NAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
EXPOSE 80