"use client";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addBy } from "./counterSlice";

export default function Counter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {value}</p>
      <button
        className="p-2 bg-amber-200 btn"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <button
        className="p-2 bg-amber-200 btn"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
      <button
        className="p-2 bg-amber-200 btn"
        onClick={() => dispatch(addBy(5))}
      >
        +5
      </button>
    </div>
  );
}
