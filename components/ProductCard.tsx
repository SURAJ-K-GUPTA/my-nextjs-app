import Image from 'next/image'; // Import Next.js Image component

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      {/* Replace <img> with <Image /> */}
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}  // Set width
        height={300} // Set height
        className="product-image"
      />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="product-price">${product.price}</p>
    </div>
  );
};

export default ProductCard;
