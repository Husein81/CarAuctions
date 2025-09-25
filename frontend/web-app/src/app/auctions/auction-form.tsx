import { Button, FieldInfo, Input, Spinner } from "@/components";
import { DatePicker } from "@/components/ui/date-picker";
import { useCreateAuction } from "@/hooks";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

export function AuctionForm() {
  const pathname = usePathname();
  const router = useRouter();

  const createAuction = useCreateAuction();

  const form = useForm({
    defaultValues: {
      make: "",
      model: "",
      color: "",
      year: 0,
      mileage: 0,
      reservePrice: 0,
      auctionEnd: new Date().toUTCString(),
      imageUrl: "",
    },
    onSubmit: async ({ value }) => {
      try {
        // Ensure auctionEnd is sent as a UTC ISO date string (Date.UTC)
        const payload = { ...value } as any;
        if (payload.auctionEnd) {
          // payload.auctionEnd expected in format yyyy-MM-dd
          const parts = String(payload.auctionEnd).split("-");
          if (parts.length === 3) {
            const year = Number(parts[0]);
            const month = Number(parts[1]) - 1; // zero-based
            const day = Number(parts[2]);
            const utcDate = new Date(Date.UTC(year, month, day));
            payload.auctionEnd = utcDate.toISOString();
          } else {
            // fallback: try to parse and convert to UTC ISO
            const d = new Date(payload.auctionEnd);
            payload.auctionEnd = new Date(
              Date.UTC(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                d.getHours(),
                d.getMinutes(),
                d.getSeconds()
              )
            ).toISOString();
          }
        }
        const res = await createAuction.mutateAsync(payload);
        router.push(`/auctions/details/${res.id}`);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message ?? "An error occurred");
        }
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
      <form.Field
        name="make"
        validators={{
          onChange: ({ value }) =>
            value.length < 1 ? "Make is required" : undefined,
        }}
      >
        {(field) => (
          <div className="mb-4 block">
            <Input
              name={field.name}
              placeholder="Make"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
      <form.Field name="model">
        {(field) => (
          <div className="mb-4 block">
            <Input
              name={field.name}
              placeholder="Model"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
      <form.Field name="color">
        {(field) => (
          <div className="mb-4 block">
            <Input
              name={field.name}
              placeholder="Color"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="year">
          {(field) => (
            <div className="mb-4 block">
              <Input
                name={field.name}
                type="number"
                placeholder="Year"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="mileage">
          {(field) => (
            <div className="mb-4 block">
              <Input
                name={field.name}
                type="number"
                placeholder="Mileage"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>

      {pathname === "/auctions/create" && (
        <>
          <form.Field name="imageUrl">
            {(field) => (
              <div className="mb-4 block">
                <Input
                  type="text"
                  placeholder="Image URL or base64 string"
                  className="mb-4"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="reservePrice">
              {(field) => (
                <div className="mb-4 block">
                  <Input
                    name={field.name}
                    type="number"
                    placeholder="Reserve Price"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
            <form.Field name="auctionEnd">
              {(field) => (
                <div className="mb-4 block">
                  <DatePicker
                    date={
                      field.state.value
                        ? new Date(field.state.value)
                        : undefined
                    }
                    setDate={(date: Date | undefined) =>
                      field.handleChange(
                        date
                          ? format(
                              new Date(
                                Date.UTC(
                                  date.getFullYear(),
                                  date.getMonth(),
                                  date.getDate()
                                )
                              ),
                              "yyyy-MM-dd"
                            )
                          : ""
                      )
                    }
                  />
                </div>
              )}
            </form.Field>
          </div>
        </>
      )}

      <form.Subscribe
        selector={(state) => [state.isSubmitting, state.canSubmit]}
      >
        {([isSubmitting, canSubmit]) => (
          <div className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
}
