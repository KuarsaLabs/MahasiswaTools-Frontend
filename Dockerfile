# @note single-stage dockerfile using bun 1.3 for react typescript project
FROM oven/bun:1.3

# @note set working directory
WORKDIR /app

# @note copy package files for dependency installation
COPY package.json bun.lock ./

# @note install dependencies using bun
RUN bun install --frozen-lockfile

# @note copy source code
COPY . .

# @note build the application for production
RUN bun run build

# @note expose port 4173 (vite preview default port)
EXPOSE 3000

# @note serve the built application using bun
CMD ["bun", "run", "start"]
