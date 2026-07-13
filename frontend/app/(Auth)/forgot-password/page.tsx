import FPForm from "@/src/components/Forms/ForgotPassword/FPForm";

export default function forgotPassword() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <FPForm />
      </div>
    </main>
  );
}
