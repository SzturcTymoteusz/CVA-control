import {Product} from "../../../lib/components/product-control";

export interface FormConfiguration {
  drinks: {
    label: string,
    products: Product[]
  },
  snacks: {
    label: string,
    products: Product[]
  },
}
