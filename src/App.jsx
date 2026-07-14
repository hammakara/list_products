import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);
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

  const openModal = (product) => {
    setIsOpenModal(true);
    setSelectProduct(product);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    setSelectProduct(null);
  };

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
                onClick={() => openModal(p)}
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

        {/* modal*/}
        {isOpenModal && (
          <div className="fixed inset-0 min-h-screen flex justify-center items-center z-50 backdrop:backdrop-blur-2xl bg-black/60">
            {/* modal container */}
            <div className="w-2xl h-2/3 bg-white/90 relative rounded-2xl shadow-2xl ">
              <button
                onClick={closeModal}
                className="p-1 rounded-full text-red-500 font-bold absolute top-3 right-3 cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex flex-row justify-center items-center">
                <div className="w-1/2 h-full p-3">
                  <img src={selectProduct.image} alt="" />
                </div>
                <div className=' w-1/2 p-3 space-y-3'>
                    <span className='uppercase tracking-wider text-sm font-medium text-red-500 text-center'>{selectProduct.category}</span>
                    <h1 className='text-xl capitalize text-center font-bold'>{selectProduct.title}</h1>
                    <p className='text-sm font-semibold text-center'>{selectProduct.description}</p>
                    <span className='font-bold text-md text-red-600 '>${selectProduct.price}</span>
                    <button className='w-full px-4 py-2 bg-slate-800 text-white'>➕ Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
