import {useEffect, useRef} from "react";

export default function useInterval(callback: Function, delay: number, zeroCall: Boolean = true) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (zeroCall) tick()

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
