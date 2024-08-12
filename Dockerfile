# Use the official PostgreSQL image from the Docker Hub
FROM postgres:16

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=your_username
ENV POSTGRES_PASSWORD=your_password
ENV POSTGRES_DB=your_database

# Expose the default PostgreSQL port
EXPOSE 5432

# Use a volume to persist data
VOLUME /var/lib/postgresql/data

# Command to start PostgreSQL server
CMD ["postgres"]
