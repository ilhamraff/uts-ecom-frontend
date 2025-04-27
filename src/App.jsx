import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Gagal terhubung ke server");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Tidak dapat mengambil data produk. Silakan coba lagi nanti.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Ilham GearZone</h1>
        <p className="text-gray-500 mt-2">152021054</p>
        <p className="text-gray-500 mt-2">152021054</p>
        <p className="text-gray-500 mt-2">
          Upgrade permainanmu dengan perlengkapan gaming terbaik.
        </p>
      </header>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto">
        {/* Error message */}
        {error && (
          <div className="text-center text-red-500 font-medium mb-6">
            {error}
          </div>
        )}

        {/* If no products */}
        {!error && products.length === 0 && (
          <div className="text-center text-gray-500 font-medium mb-6">
            Produk belum tersedia.
          </div>
        )}

        {/* Product list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-sm hover:shadow-md rounded-2xl overflow-hidden transition duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-500 mt-2">Rp {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
