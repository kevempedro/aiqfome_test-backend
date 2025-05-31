export async function getAllClients() {
  try {
    const clients = [
      {
        name: 'Kevem Lima',
        email: 'kevem@gmail.com'
      }
    ];

    return clients;
  } catch (error: any) {
    throw error;
  }
};
