import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-10 mx-auto text-white md:flex-row">
      {/* Bagian Teks */}
      <div className="px-6 text-center md:text-left">
        <h1 className="mb-4 text-6xl font-bold text-black dark:text-white">
          OOPS
        </h1>
        <h2 className="text-2xl font-medium text-black dark:text-white">
          404 - That's Error
        </h2>
        <p className="mt-4 text-black dark:text-white ">
          The requested URL was not found on this server. That's all we know.
        </p>

        {/* Tombol Back to Home */}
        <div className="mt-6">
          <Button variant="default">
            <Link className="text-black dark:text-white" href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Bagian Gambar */}
      <div className="flex justify-center mt-8 md:mt-0">
        <img
          src="/404-scarameow.svg"
          alt="404 Image"
          className="object-contain w-64 h-64"
        />
      </div>
    </div>
  );
}
