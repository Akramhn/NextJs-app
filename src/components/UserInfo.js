"use client";
import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import useStore from "../app/store/userStore";

export default function UserInfo() {
  const { user, setUser, clearUser } = useStore();
  const [loading, setLoading] = useState(true); // For session loading
  const [logoutLoading, setLogoutLoading] = useState(false); // For logout loading

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.token.user || null); // Assuming `session.token.user` contains user data
      }
      setLoading(false);
    };

    if (!user) {
      fetchSession();
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  const handleLogout = async () => {
    setLogoutLoading(true); // Start logout loader
    await signOut({ redirect: true, callbackUrl: "/sign-in" }).then(()=>{

    });
  };

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-600 mt-10">
        Loading...
      </p>
    );
  }

  if (!user) {
    return (
      <p className="text-center text-lg text-gray-600 mt-10">
        You are not logged in!
      </p>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold text-gray-800">Hello, {user.fullName}!</h1>
      <p className="text-gray-600 mt-2">Your email is: {user.email}</p>
      {logoutLoading ? (
        <div className="mt-4">
          <p className="text-gray-500">Logging out...</p>
          <div className="spinner-border text-danger mt-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Log out
        </button>
      )}
    </div>
  );
}
