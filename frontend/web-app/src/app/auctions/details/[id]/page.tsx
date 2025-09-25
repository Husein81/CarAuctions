import { getCurrentUser } from "@/app/actions/authAuctions";
import AuctionDetails from "./AuctionDetails";

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  return <AuctionDetails id={id} user={user} />;
}
