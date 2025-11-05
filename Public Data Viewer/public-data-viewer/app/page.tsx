"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Loading data...</h2>;
  if (error) return <h2 style={{ color: "red" }}>Error: {error}</h2>;

  return (
    <main className="container">
      <h1>Public Data Viewer</h1>

      <input
        type="text"
        placeholder="Filter by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <div className="grid">
        {filtered.slice(0, 18).map((item) => (
          <div key={item.id} className="card">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="item-image"
            />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
