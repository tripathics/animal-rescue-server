CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    role text[] NOT NULL CHECK(role <@ ARRAY['admin', 'user']) DEFAULT ARRAY['user']
);

CREATE TABLE IF NOT EXISTS otp_email (
    email varchar(50) PRIMARY KEY NOT NULL,
    otp varchar(6) NOT NULL,
    verified BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS otp_email_attempts (
    email varchar(50) PRIMARY KEY NOT NULL,
    attempts INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
