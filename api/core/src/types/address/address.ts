export interface Address {
  id: number
  Street: string
  Number: string
  City: string
  isMain: boolean
  zipCode: string
  UserId: number
}

// types/address.ts
export interface AddressInput {
  Street: string;
  Number: string;
  City: string;
  isMain: boolean;
  zipCode: string;
  UserId: number;
}

export interface AddressUpdate {
  id?: number
  Street?: string;
  Number?: string;
  City?: string;
  isMain?: boolean;
  zipCode?: string;
}
