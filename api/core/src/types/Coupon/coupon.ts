export interface couponInput {
  code: string
  discount: number
  expireAt: Date
  typeDiscount: string 
  status: boolean
  
}

export interface couponOutput {
  id: number
  code: string
  discount: number
  expireAt: Date
  typeDiscount: string
  status: boolean
}

export interface couponUpdate {
  code?: string
  discount?: number
  expireAt?: Date
  typeDiscount?: string
  status?: boolean
}