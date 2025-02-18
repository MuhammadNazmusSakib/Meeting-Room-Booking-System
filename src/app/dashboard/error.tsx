
"use client"; 

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div className="text-center text-red-600">
      <p> Something went wrong!</p>
      <button
        onClick={() => reset()} // Try reloading the page
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Retry
      </button>
    </div>
  );
}
