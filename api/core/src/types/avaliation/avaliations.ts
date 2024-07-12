export type avaliationsOutput = {
  id: number
  rating: number
  comment: string
  userId: number
  productId: number
}

export type avaliationsInput = {
  rating: number
  comment: string
  userId: number
  productId: number
}