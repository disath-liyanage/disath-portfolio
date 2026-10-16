import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SplashScreen({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tl.from(logoRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      })
      .to({}, { duration: 0.4 })
      
      .to(logoRef.current, {
        scale: 0.85,
        duration: 0.15,
        ease: "power2.inOut",
      })

      .to(logoRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(rippleRef.current, {
        scale: 300,
        opacity: 1,
        duration: 1.2,
        ease: "expo.inOut",
      }, "-=0.4")
      
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        ref={rippleRef}
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
          backgroundColor: "var(--bg, #08080a)",
          borderRadius: "50%",
          transform: "scale(0)",
          zIndex: 1,
        }}
      />

      <img
        ref={logoRef}
        src="/icon.svg"
        alt="Logo"
        style={{
          position: "relative",
          zIndex: 2,
          width: "90px",
          height: "90px",
          willChange: "transform, opacity"
        }}
      />
    </div>
  );
}