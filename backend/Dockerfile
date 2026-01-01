# Stage 1: Dependencies
FROM node:20-alpine AS dependencies

# Add security: Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
# --omit=dev skips devDependencies
# --ignore-scripts prevents running potentially malicious scripts
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# Stage 2: Build TypeScript
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev dependencies for TypeScript compilation)
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Prune dev dependencies after build
RUN npm prune --production

# Stage 3: Production Runtime
FROM node:20-alpine AS production

# Security: Run as non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy production dependencies from dependencies stage
COPY --chown=nodejs:nodejs --from=dependencies /app/node_modules ./node_modules

# Copy built JavaScript from builder stage
COPY --chown=nodejs:nodejs --from=builder /app/dist ./dist

# Copy package.json for any runtime needs
COPY --chown=nodejs:nodejs --from=builder /app/package*.json ./

# Switch to non-root user
USER nodejs

# Expose port (should match your PORT env variable)
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application from compiled JavaScript
CMD ["node", "dist/server.js"]