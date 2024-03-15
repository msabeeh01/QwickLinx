const Product = ({ product }) => {
  return (
    <div className="flex flex-col justify-between p-4 w-96 h-96 bg-base-100 shadow-xl hover:scale-105 transition-all duration-200 rounded-lg">
      <figure className="px-10 pt-10 h-1/2 bg-black">
        <img
                    src="https://api.lorem.space/image/shoes?w=400&h=225"
                    alt="Shoes"
                    className="rounded-xl"
                />
      </figure>
      <div className="flex flex-col gap-4 items-center text-center p-4">
        <div>
          <p className="text-xl">{product.name}</p>
          <p className="text-lg">{product.price}</p>
          <p className="">{product.description}</p>
        </div>
        <div className="">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
