export interface Review {
    userID: string;  // ID of the user who left the review
    rating: number;  // Rating given by the user
    comment?: string;  // Optional comment by the user
    createdAt: Date;  // Date when the review was created
    productID:string;
    reasons?: string;
    isBan: boolean;  // Whether the review is active or not
  }