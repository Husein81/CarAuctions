import EmptyFilter from "@/components/empty-filter";

export default function Page({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <EmptyFilter
      title="You need to be logged in to do that"
      subtitle="Please click below to sign in"
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
}
