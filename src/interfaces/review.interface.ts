export interface Review {
    userId: string;  // ID of the user who left the review
    rating: number;  // Rating given by the user
    comment?: string;  // Optional comment by the user
    createdAt: Date;  // Date when the review was created
  }