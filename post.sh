-- Create a new user
CREATE USER homeworkaidev WITH PASSWORD 'password';

-- Create a new database and set the owner
CREATE DATABASE new_database OWNER homeworkaidev;

-- Grant all privileges on the new database to the new user
GRANT ALL PRIVILEGES ON DATABASE new_database TO homeworkaidev;

-- Check which databases are owned by the new user
SELECT datname FROM pg_database WHERE datdba = (SELECT oid FROM pg_roles WHERE rolname = 'homeworkaidev');
