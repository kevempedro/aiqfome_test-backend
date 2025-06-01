import app from '../app';

export async function getAllClients() {
  const query =
  `
    SELECT
      c.name,
      c.email,
      c.is_active AS "isActive",
      c.created_at AS "createdAt",
      c.updated_at AS "updatedAt",
      c.deleted_at AS "deletedAt"
    FROM client AS c
  `;

  const { rows, rowCount } = await app.pg.query(query);

  return {
    clients: rows,
    totalCount: rowCount
  };
};
