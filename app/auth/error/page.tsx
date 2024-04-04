import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div>
        <p> Oops something went wrong</p>
        <div className="flex gap-4">
          <Link href="/auth/login">login</Link>
          <Link href="/auth/login">register</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
