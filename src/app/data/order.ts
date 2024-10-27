export interface Order {
  id: number;
  userId: number;
  paymentIntentId: string;
  summaryId: number;
  orderDate: Date;
  items: string;
  total: number;
}
