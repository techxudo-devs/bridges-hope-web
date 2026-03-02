"use client";

import { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  "a, button, [role=\"button\"], [data-cursor=\"hover\"]";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const isActive = useRef(false);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    const updatePosition = () => {
      const scale = isActive.current ? 1.3 : 1;
      cursor.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      animationFrame.current = requestAnimationFrame(updatePosition);
    };

    const handleMove = (event: MouseEvent) => {
      position.current = { x: event.clientX, y: event.clientY };
    };

    const handlePointerOver = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(HOVER_SELECTOR)) {
        isActive.current = true;
        cursor.classList.add("custom-cursor--active");
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(HOVER_SELECTOR)) {
        isActive.current = false;
        cursor.classList.remove("custom-cursor--active");
      }
    };

    animationFrame.current = requestAnimationFrame(updatePosition);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
};

export default CustomCursor;
