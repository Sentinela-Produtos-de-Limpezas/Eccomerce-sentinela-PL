export type categoriesOutput = {
  id: number
  name: string
}

export type categoriesInput = {
  name: string
  description: string
}

export type categoriesUpdate = {
  name?: string
  description?: string
}