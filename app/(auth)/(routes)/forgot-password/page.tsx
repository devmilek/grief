import React from "react";
import ForgotPasswordForm from "./_components/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <section className="max-w-md px-4 flex items-center justify-center w-full mx-auto">
      <div className="">
        <h1 className="text-4xl font-display">Zapomniane hasło</h1>
        <p className="text-gray-500 text-sm mt-2 mb-6">
          Wpisz adres email powiązany z Twoim kontem, a my wyślemy Ci link do
          zmiany hasła.
        </p>
        <ForgotPasswordForm />
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
