export interface Address  {
  street: string
  number: string
  city: string
  state: string
  zipCode: string
  isMain: boolean
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
