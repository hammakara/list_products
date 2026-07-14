import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = products.filter((pro) =>
    pro.title.trim().includes(searchTerm.trim()),
  );
  console.log(filterProducts);

  return (
    <div>
      <div className="max-w-7xl mx-auto p-5 ">
        <h1 className=" text-2xl font-bold text-red-500 text-center">
          Products List{' '}
        </h1>
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search product...."
          className="w-2/3 mx-auto flex items-center justify-center px-3
        py-3 border border-red-400 rounded-md shadow-md focus:outline-none focus:ring-2 ring-red-400 placeholder:text-red-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-5">
          {loading ? <h2>Loading..</h2> : ''}
          {filterProducts.length > 0 ? (
            filterProducts.map((p) => (
              <div
                key={p.id}
                className="h-72 border border-gray-200 rounded-md shadow-md transform hover:scale-105 duration-300 cursor-pointer"
              >
                <img
                  src={p.image}
                  alt=""
                  className="w-full h-3/4 rounded-2xl object-cover"
                />
                <div className="px-3">
                  <h2 className=" text-xl text-center">{p.title}</h2>
                  <span className=" text-md text-red-500 ">${p.price}</span>
                </div>
              </div>
            ))
          ) : (
            <h1>No Data!</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
