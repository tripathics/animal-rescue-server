CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    role text[] NOT NULL CHECK(role <@ ARRAY['org', 'user']) DEFAULT ARRAY['user']
);

CREATE TABLE IF NOT EXISTS profiles (
    user_id uuid REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,    
    first_name varchar(64) NOT NULL,
    last_name varchar(64),
    address varchar(128) NOT NULL,
    pincode varchar(10) NOT NULL,
    state  varchar(64) NOT NULL,
    city varchar(64) NOT NULL,
    country  varchar(64) NOT NULL,

    location_lat numeric DEFAULT NULL,
    location_lng numeric DEFAULT NULL,

    phone varchar(15),
    avatar varchar(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    description text NOT NULL,
    pictures text[] DEFAULT NULL,
    post_type text NOT NULL CHECK(post_type IN ('post', 'donation')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rescues (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    org_id uuid REFERENCES users(id) ON DELETE CASCADE,
    animal_name text NOT NULL,
    description text NOT NULL,
    location_lat numeric NOT NULL,
    location_lng numeric NOT NULL,
    pictures text[] NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
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
