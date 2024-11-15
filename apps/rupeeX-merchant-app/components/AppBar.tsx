"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AppBar() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* App Logo */}
        <div className="text-xl font-bold">
          <a href="/">RupeeX</a>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          {session?.user ? (
            <>
              <span className="hidden sm:inline">
                Welcome, {session.user.name || "User"}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
