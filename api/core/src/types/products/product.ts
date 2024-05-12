export type productInput = {
  name: string,
  price: number,
  image: string
  sku: string
}


export type productUpdate = {
  name?: string,
  price?: number,
  image?: string
  sku?: string
}

export type productOutput = {
  id: number,
  name: string,
  price: number,
  image: string
  sku: string
}

export type productBody = Omit<productInput, "description">