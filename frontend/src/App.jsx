import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct } from './features/products/productSlice';

function App() {
  const dispatch = useDispatch();
  
  const { items, status } = useSelector((state) => state.products);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ name, description }));
    setName('');
    setDescription('');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>Product Management System</h1>
      
      <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            placeholder="Product Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          />
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            Add Product
          </button>
        </form>
      </section>

      <hr />

      <section>
        <h3>Product List</h3>
        {status === 'loading' && <p>Loading products...</p>}
        <div style={{ display: 'grid', gap: '15px' }}>
          {items.length === 0 && <p>No products found.</p>}
          {items.map(product => (
            <div key={product.id} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{product.name}</strong>
                <p style={{ margin: '5px 0', color: '#666' }}>{product.description}</p>
              </div>
              <button 
                onClick={() => dispatch(deleteProduct(product.id))}
                style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;