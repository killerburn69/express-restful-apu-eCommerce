export interface Brand {
    name: string;  // Name of the brand
    description?: string;  // Optional description of the brand
    logo?: string;  // Optional logo URL or file path for the brand
    website?: string;  // Optional official website of the brand
    isActive: boolean;  // Whether the brand is active or not
    createdAt: Date;  // Date when the brand was created
    updatedAt: Date;  // Date when the brand was last updated
  }
  