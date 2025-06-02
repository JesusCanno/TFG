# Imagen base con PHP y extensiones necesarias
FROM php:8.2-cli

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    zip \
    libzip-dev \
    libpq-dev \
    libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Crear directorio de la app
WORKDIR /app

# Copiar archivos
COPY . .

# Instalar dependencias PHP (Laravel)
RUN composer install --no-dev --optimize-autoloader

# Puerto para Laravel (Render espera este puerto)
EXPOSE 10000

# Comando de inicio
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
