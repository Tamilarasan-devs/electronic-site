import React, { useEffect, useRef, useState } from "react";

/* ─── IMAGES ─── */
import img from "../assets/images/Gallery/img.jpeg";
import img1 from "../assets/images/Gallery/img1.jpeg";
import img2 from "../assets/images/Gallery/img2.jpeg";
import img3 from "../assets/images/Gallery/img3.jpeg";
import img4 from "../assets/images/Gallery/img4.jpeg";
import img5 from "../assets/images/Gallery/img5.jpeg";
import img6 from "../assets/images/Gallery/img6.jpeg";
import img7 from "../assets/images/Gallery/img7.jpeg";
import img8 from "../assets/images/Gallery/img8.jpeg";
import img9 from "../assets/images/Gallery/img9.jpeg";
import img10 from "../assets/images/Gallery/img10.jpeg";
import img11 from "../assets/images/Gallery/img11.jpeg";
import img12 from "../assets/images/Gallery/img12.jpeg";
import img13 from "../assets/images/Gallery/img13.jpeg";
import img14 from "../assets/images/Gallery/img14.jpeg";
import img15 from "../assets/images/Gallery/img15.jpeg";
import img16 from "../assets/images/Gallery/img16.jpeg";
import img17 from "../assets/images/Gallery/img17.jpeg";
import img18 from "../assets/images/Gallery/img18.jpeg";
import img19 from "../assets/images/Gallery/img19.jpeg";
import img20 from "../assets/images/Gallery/img20.jpeg";
import img21 from "../assets/images/Gallery/img21.jpeg";

const images = [
  img, img1, img2, img3, img4, img5, img6,
  img7, img8, img9, img10, img11, img12,
  img13, img14, img15, img16, img17, img18,
  img19, img20, img21
];

export default function Gallery() {
  const [activeImg, setActiveImg] = useState(null);
  const gridRef = useRef();

  /* ─── SCROLL ANIMATION ─── */
  useEffect(() => {
    const items = gridRef.current.querySelectorAll(".g-card");

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            e.target.style.opacity = 1;
            e.target.style.transform = "translateY(0) scale(1)";
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="gallery-section">
      
      {/* HEADER */}
      <div className="g-header">
        <h2>
          Our <span>Gallery</span>
        </h2>
        <p>Real service moments captured by our technicians</p>
      </div>

      {/* GRID */}
      <div ref={gridRef} className="g-grid">
        {images.map((src, i) => (
          <div
            key={i}
            className="g-card"
            style={{ transitionDelay: `${i * 0.05}s` }}
            onClick={() => setActiveImg(src)}
          >
            <img src={src} alt="" />

            <div className="g-overlay">
              <span>View Image</span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {activeImg && (
        <div className="g-lightbox" onClick={() => setActiveImg(null)}>
          <img src={activeImg} alt="" />
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .gallery-section {
          padding: 100px 20px;
          background: linear-gradient(180deg,#fff,#fafafa);
        }

        /* HEADER */
        .g-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .g-header h2 {
          font-size: clamp(42px, 6vw, 72px);
          font-weight: 900;
          letter-spacing: 3px;
          margin: 0;
        }

        .g-header span {
          color: #890b44;
          position: relative;
        }

        .g-header p {
          margin-top: 12px;
          font-size: 18px;
          color: rgba(0,0,0,0.6);
        }

        /* GRID */
        .g-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 22px;
        }

        /* CARD */
        .g-card {
          position: relative;
          height: 240px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;

          opacity: 0;
          transform: translateY(60px) scale(0.95);

          transition: all 0.6s cubic-bezier(.22,1,.36,1);
        }

        .g-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        /* HOVER EFFECT */
        .g-card:hover img {
          transform: scale(1.15) rotate(1deg);
        }

        .g-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 25px 60px rgba(137,11,68,0.25);
        }

        /* GLASS OVERLAY */
        .g-overlay {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(8px);
          background: rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: 0.4s;
        }

        .g-overlay span {
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 2px;
          border: 1px solid rgba(255,255,255,0.4);
          padding: 10px 18px;
          border-radius: 999px;
        }

        .g-card:hover .g-overlay {
          opacity: 1;
        }

        /* LIGHTBOX */
        .g-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        .g-lightbox img {
          max-width: 90%;
          max-height: 85%;
          border-radius: 16px;
          animation: zoomIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        @keyframes zoomIn {
          from { transform: scale(0.85); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
      `}</style>
    </section>
  );
}