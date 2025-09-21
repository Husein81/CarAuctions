import z from "zod";

export const pagedResultSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    results: z.array(itemSchema),
    pageCount: z.number(),
    totalCount: z.number(),
  });

export const auctionSchema = z.object({
  reservePrice: z.number(),
  seller: z.string(),
  winner: z.string().optional(),
  soldAmount: z.number(),
  currentHighBid: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  auctionEnd: z.string(),
  status: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number(),
  color: z.string(),
  mileage: z.number(),
  imageUrl: z.string(),
  id: z.string(),
});

export const bidSchema = z.object({
  id: z.string(),
  auctionId: z.string(),
  bidder: z.string(),
  amount: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const auctionFinishedSchema = z.object({
  itemSold: z.boolean(),
  auctionId: z.string(),
  winner: z.string().nullable(),
  seller: z.string(),
  amount: z.number().nullable(),
});

export type PagedResult<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof pagedResultSchema<T>>
>;
export type Auction = z.infer<typeof auctionSchema>;
export type Bid = z.infer<typeof bidSchema>;
export type AuctionFinished = z.infer<typeof auctionFinishedSchema>;
