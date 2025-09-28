import { useForm } from "@tanstack/react-form";
import { Input } from "../ui";
import { FieldInfo } from "../field-info";
import { toast } from "react-toastify";
import { usePlaceBidForAuction } from "@/hooks";
import { useRef } from "react";

type Props = {
  auctionId: string;
  highBid: number;
};

const BidForm = ({ auctionId, highBid }: Props) => {
  const placeBid = usePlaceBidForAuction();

  const form = useForm({
    defaultValues: {
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      try {
        if (value.amount < highBid) {
          toast.error(
            `Bid amount must be higher than current high bid of $${highBid}`
          );
          return;
        }

        await placeBid.mutateAsync({
          auctionId,
          amount: value.amount,
        });

        form.reset();
      } catch (error) {}
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(e);
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form ref={formRef} className="flex items-center border-1 rounded-lg py-2">
      <form.Field name="amount">
        {(field) => (
          <>
            <Input
              name={field.name}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              type="number"
              placeholder={`Enter your bid (minimum bid is ${highBid + 1}) `}
              className="flex-grow pl-5 bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none text-sm text-gray-600 shadow-none"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
            <FieldInfo field={field} />
          </>
        )}
      </form.Field>
    </form>
  );
};

export default BidForm;
