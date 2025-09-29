import Heading from "@/components/heading";
import AuctionForm from "@/app/auctions/auction-form";

export default async function Update({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update your auction"
        subtitle="Please update the details of your 
                car (only these auction properties can be updated)"
      />
      <AuctionForm id={id} />
    </div>
  );
}
