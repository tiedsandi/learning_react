import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
  const params = useParams();

  // const { productId } = useParams();
  // const id = params.productId;

  return (
    <>
      <h1>Detail Page</h1>
      <p>{params.productId}</p>
    </>
  );
}
