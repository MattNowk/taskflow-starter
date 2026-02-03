# =============================================================================
# TaskFlow - Dockerfile
# =============================================================================
#
# OBJECTIF JOUR 5 : Compléter ce Dockerfile pour :
# 1. Builder l'application avec Node.js
# 2. Servir les fichiers statiques avec nginx
#
# Conseil : Utiliser un multi-stage build (vu dans le cours Docker)
# =============================================================================

# TODO Jour 5 : Implémenter le Dockerfile
#
# Stage 1 : Build
# - Image de base : node:20-alpine
# - Installer les dépendances
# - Builder l'application (npm run build)
#
# Stage 2 : Production
# - Image de base : nginx:alpine
# - Copier les fichiers buildés dans /usr/share/nginx/html
# - Exposer le port 80

# Exemple de structure (à compléter) :
#
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build
#
# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
