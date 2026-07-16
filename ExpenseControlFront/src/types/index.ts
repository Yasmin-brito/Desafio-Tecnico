export interface User {
  id: string
  name: string
  age: number
}

export interface Transaction {
  id: string
  description: string
  value: number
  type: 0 | 1 //0 receitas e 1 despesa
  createdAt: string
  userName: string
}

export interface PagedResult<T> {
  datas: T[]
  totalRecords: number
  pageNumber: number
  pageSize: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
