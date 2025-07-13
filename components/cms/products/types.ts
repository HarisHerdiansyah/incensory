type LinkTarget = 'SHOPEE' | 'TOKOPEDIA' | 'WHATSAPP';

export type ProductFormState = {
  name: string;
  description: string;
  price: number;
  links: Partial<Record<LinkTarget, string>>;
  existingImages: string[];
  uploadedImages: string[];
  deletedImages: string[];
};

export type ProductProps = {
  values: ProductFormState;
  onChange: <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K]
  ) => void;
};

export type ProductFormMode = 'add' | 'edit';

export interface ProductFormProps {
  mode: ProductFormMode;
  defaultValues?: ProductFormState;
  productId?: string;
}

export type ProductResponse = {
  id: string;
  name: string;
  price: number | string;
};
