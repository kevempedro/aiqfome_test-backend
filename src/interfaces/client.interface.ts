export interface IGetAllClientsQuery {
  search?: string,
  page: number,
  perPage: number
}

export interface ICreateClientBody {
  name: string,
  email: string
  password: string,
  birthDate?: string
};

export interface IUpdateClientBody {
  name: string,
  email: string
  birthDate?: string
};
