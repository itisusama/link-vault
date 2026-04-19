export interface Link {
  _id?: string;
  id?: string; // for local dev
  name: string;
  url: string;
  description?: string;
  createdAt?: string;
}
