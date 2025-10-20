# @note dockerfile for react typescript project using bun 1.3
FROM oven/bun:1.3

# @note set working directory in container
WORKDIR /app

# @note copy package files for dependency installation
COPY package.json bun.lock ./

# @note install dependencies using bun
RUN bun install

# @note copy source code to container
COPY . .

# @note instapp dependencies again
RUN bun install

# @note build application for production
RUN bun run build

# @note expose port for vite preview server
EXPOSE 4173

# @note serve the built application
CMD ["bun", "run", "preview"]
