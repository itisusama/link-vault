export interface Link {
  _id?: string;
  id?: string; // for local dev
  linkName: string;
  destinationUrl: string;
  description?: string;
  createdAt?: string;
}
