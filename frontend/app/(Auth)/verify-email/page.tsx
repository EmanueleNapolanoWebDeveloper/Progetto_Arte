import VerifyEmailClient from "./VerifyEmailClient";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token ?? null;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Verifica Email</h1>
      <VerifyEmailClient token={token} />
    </div>
  );
}
