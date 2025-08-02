import { useEffect } from "react";

export function useClickOutside(ref, callback,ignoreRef) {
  useEffect(() => {
    function handleClick(event) {
       if (  ref.current && !ref.current.contains(event.target) &&
        (!ignoreRef?.current || !ignoreRef.current.contains(event.target))
      ) {
        callback(); // Close the popup
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback,ignoreRef]);
}