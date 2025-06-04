CREATE TABLE client_favorite_product (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  price NUMERIC(13, 2) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image VARCHAR(255),
  rating JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
