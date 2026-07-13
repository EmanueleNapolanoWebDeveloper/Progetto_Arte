import ResetPasswordForm from "@/src/components/Forms/ResetPassword/ResetPasswordForm";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const params = await searchParams;
  const token = params.token ?? null;
  const email = params.email ?? null;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Verifica Email</h1>
      <ResetPasswordForm token={token} email={email} />
    </div>
  );
}
