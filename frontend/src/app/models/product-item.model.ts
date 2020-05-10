export interface ProductItem {
  _id: string;
  dateAdded: string;
  detailedDescription: string;
  name: string;
  sellingPrice: number | string;
  shortDescription: string;
  sku: string;
  supplier: string;
	supplierPrice: number | string;
	imgUrl?: string;
	isDeleted?: boolean;
}
