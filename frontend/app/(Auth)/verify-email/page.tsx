import VerifyEmailClient from "./VerifyEmailClient";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token ?? null;

  return <VerifyEmailClient token={token} />;
}
