import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { showNotification } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    const sendCartData = async () => {
      dispatch(
        showNotification({
          status: 'pending',
          title: 'sending...',
          message: 'Sending cart data!',
        })
      );
      const response = await fetch(
        'https://react-firebase-6eb95-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(
        showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data Successufly!',
        })
      );
    };

    sendCartData().catch((error) => {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sent cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
