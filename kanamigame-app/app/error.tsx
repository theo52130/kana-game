"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-4 bg-red-100 text-red-800 rounded">
      <h2>Une erreur est survenue !</h2>
      <button
        onClick={() => reset()}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Réessayer
      </button>
    </div>
  );
}
