import { IGetAllClientsQuery, ICreateClientBody } from '../interfaces/client.interface';
import app from '../app';

export async function getAllClients(query: IGetAllClientsQuery) {
  const {
    search,
    page,
    perPage
  } = query;

  const searchQuery = search ? `%${search}%` : '%%';
  const offset = ((page - 1) * perPage);

  const { rows, rowCount } = await app.pg.query(
    `
      SELECT
        c.id,
        c.name,
        c.email,
        TO_CHAR(c.birth_date, 'YYYY-MM-DD') AS "birthDate",
        c.is_active AS "isActive",
        c.created_at AS "createdAt",
        c.updated_at AS "updatedAt",
        c.deleted_at AS "deletedAt"
      FROM client AS c
      WHERE c.name ILIKE $1
      OR c.email ILIKE $2
      LIMIT $3 OFFSET $4;
    `,
    [searchQuery, searchQuery, perPage, offset]
  );

  return {
    clients: rows,
    totalCount: rowCount
  };
};

export async function getClientByEmail(email: string) {
  const { rowCount } = await app.pg.query(
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

  await app.pg.query(
     `
      INSERT INTO client (name, email, password, birth_date)
      VALUES ($1, $2, $3, $4);
    `,
    [name, email, password, birthDate || null]
  );
};
