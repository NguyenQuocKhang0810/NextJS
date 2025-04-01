// ExampleComponent.tsx (use client)
"use client";

import { useState, useEffect } from "react";

export default function ExampleComponent() {
  const [result, setResult] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/search?query=hello");
        if (response.ok) {
          const data = await response.json();
          console.log("Response from API:", data);
          setResult(JSON.stringify(data));
        } else {
          console.error("API request failed");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Search API Test</h1>
      <p>API Response: {result}</p>
    </div>
  );
}
