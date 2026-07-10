import RegisterForm from "@/src/components/Forms/Register/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}
