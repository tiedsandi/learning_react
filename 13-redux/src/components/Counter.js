import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';
import { coutnerActions } from '../store/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(coutnerActions.increment());
  };

  const increaseHandler = () => {
    dispatch(coutnerActions.increase(5));
  };

  const decrementHandler = () => {
    dispatch(coutnerActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(coutnerActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
