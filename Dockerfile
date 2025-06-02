FROM php:8.2-cli

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    unzip git curl zip libzip-dev libonig-dev libpq-dev nodejs npm \
    && docker-php-ext-install zip pdo pdo_mysql

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Copia todo el código
COPY . .

# Instala dependencias PHP
RUN composer install --no-dev --optimize-autoloader

# Instala dependencias JS y compila frontend
RUN npm install && npm run build

# Copia archivo .env para que exista antes de ejecutar artisan
RUN cp .env.example .env

# Limpia configuración cache y genera la clave de la app
RUN php artisan config:clear && php artisan key:generate

# Expone el puerto (Render escucha por 10000)
EXPOSE 10000

# Inicia Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
