import {
  IGetAllClientsQuery,
  ICreateClientBody,
  IUpdateClientBody
} from '../interfaces/client.interface';
import { IProductBody } from '../interfaces/product.interface';
import app from '../app';

export async function getAllClients(query: IGetAllClientsQuery) {
  const {
    search,
    page,
    perPage
  } = query;

  const searchQuery = search ? `%${search}%` : '%%';
  const offset = ((page - 1) * perPage);

  const { rows, rowCount } = await app.connection.query(
    `
      SELECT
        c.id,
        c.name,
        c.email,
        TO_CHAR(c.birth_date, 'YYYY-MM-DD') AS "birthDate",
        c.is_active AS "isActive",
        c.created_at AS "createdAt",
        c.updated_at AS "updatedAt"
      FROM client AS c
      WHERE c.name ILIKE $1
      OR c.email ILIKE $2
      ORDER BY c.created_at ASC
      LIMIT $3 OFFSET $4;
    `,
    [searchQuery, searchQuery, perPage, offset]
  );

  return {
    clients: rows,
    totalCount: rowCount
  };
};

export async function getClientById(id: number) {
  const { rows } = await app.connection.query(
    `
      SELECT
        c.id,
        c.name,
        c.email,
        TO_CHAR(c.birth_date, 'YYYY-MM-DD') AS "birthDate",
        c.is_active AS "isActive",
        c.created_at AS "createdAt",
        c.updated_at AS "updatedAt"
      FROM client AS c
      WHERE c.id = $1;
    `,
    [id]
  );

  return rows[0];
};

export async function checkIfProductAlreadyFavorite(clientId: number, productId: number) {
  const { rows } = await app.connection.query(
     `
      SELECT * FROM client_favorite_product WHERE client_id = $1 AND product_id = $2
    `,
    [clientId, productId]
  );

  return rows[0];
};

export async function clientCredentials(email: string) {
  const { rows } = await app.connection.query(
    `
      SELECT
        c.id,
        c.name,
        c.password,
        TO_CHAR(c.birth_date, 'YYYY-MM-DD') AS "birthDate",
        c.is_active AS "isActive"
      FROM client AS c
      WHERE c.email = $1;
    `,
    [email]
  );

  return rows[0];
};

export async function checkIfEmailAlreadyExists(email: string) {
  const { rowCount } = await app.connection.query(
    `
      SELECT
        c.id
      FROM client AS c
      WHERE c.email = $1;
    `,
    [email]
  );

  return rowCount;
};

export async function createClient(body: ICreateClientBody) {
  const {
    name,
    email,
    password,
    birthDate,
  } = body;

  await app.connection.query(
     `
      INSERT INTO client (name, email, password, birth_date)
      VALUES ($1, $2, $3, $4);
    `,
    [name, email, password, (birthDate || null)]
  );
};

export async function updateClient(id: number, body: IUpdateClientBody) {
  const {
    name,
    email,
    birthDate,
  } = body;

  await app.connection.query(
     `
      UPDATE client
        SET name = $1, email = $2, birth_date = $3, updated_at = now()
      WHERE id = $4;
    `,
    [name, email, (birthDate || null), id]
  );
};

export async function updateClientStatus(id: number, status: boolean) {
  await app.connection.query(
     `
      UPDATE client
        SET is_active = $1, updated_at = now()
      WHERE id = $2;
    `,
    [status, id]
  );
};

export async function favoriteProduct(clientId: number, product: IProductBody) {
  const {
    id: productId,
    title,
    price,
    description,
    category,
    image,
    rating
  } = product;

  await app.connection.query(
     `
      INSERT INTO client_favorite_product
        (client_id, product_id, title, price, description, category, image, rating)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [clientId, productId, title, price, (description || null), (category || null), (image || null), (rating || null)]
  );
};

export async function deleteClient(id: number) {
  await app.connection.query(
    `
      DELETE FROM client WHERE id = $1;
    `,
    [id]
  );
};
