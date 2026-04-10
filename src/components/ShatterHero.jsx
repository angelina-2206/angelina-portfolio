import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

// ─────────────────────────────────────────────
//  ShatterHero — Kode Immersive-style 3D shatter
//  Drop into your Hero section as a background layer
//  Drag / touch-hold → fragments explode outward
// ─────────────────────────────────────────────

const FRAGMENT_COUNT = 280;
const GRID_COLS = 20;
const GRID_ROWS = 14;

export default function ShatterHero({ subtitle = "ANGELINA CHATTERJEE" }) {
  const mountRef = useRef(null);
  const stateRef = useRef({});
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Scene setup ──────────────────────────
    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 5;

    // ── Lights ───────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    // Updated lights for purple theme
    const dirLight = new THREE.DirectionalLight(0x9d4edd, 1.8);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0xc77dff, 0.8);
    dirLight2.position.set(-4, -2, 3);
    scene.add(dirLight2);
    const rimLight = new THREE.DirectionalLight(0x3c096c, 0.5);
    rimLight.position.set(0, -3, -2);
    scene.add(rimLight);

    // ── Fragment geometry ─────────────────────
    const fragments = [];
    const cols = GRID_COLS;
    const rows = GRID_ROWS;
    const fW = 8.0 / cols;
    const fH = 4.5 / rows;

    // Build each fragment as a slightly irregular quad
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const jitter = () => (Math.random() - 0.5) * 0.08;

        // Base quad corners with jitter for organic feel
        const x0 = -4 + c * fW + jitter();
        const y0 = -2.25 + r * fH + jitter();
        const x1 = x0 + fW + jitter();
        const y1 = y0 + fH + jitter();
        const cx = (x0 + x1) / 2;
        const cy = (y0 + y1) / 2;

        // Thickness varies
        const depth = 0.04 + Math.random() * 0.08;

        const geo = new THREE.BoxGeometry(
          (x1 - x0) * 0.92,
          (y1 - y0) * 0.92,
          depth
        );

        // Colour gradient: dark base with purple accent tint
        const t = (r / rows) * 0.6 + Math.random() * 0.4;
        const baseColor = new THREE.Color().setHSL(
          t < 0.3 ? 0.75 : t < 0.6 ? 0.80 : 0.72,
          0.6 + Math.random() * 0.3,
          0.08 + Math.random() * 0.18
        );

        const mat = new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.3 + Math.random() * 0.4,
          metalness: 0.5 + Math.random() * 0.5,
          envMapIntensity: 1.2,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(cx, cy, 0);

        // Store rest/exploded state
        mesh.userData = {
          restPos: new THREE.Vector3(cx, cy, 0),
          restRot: new THREE.Euler(0, 0, 0),
          vel: new THREE.Vector3(),
          angVel: new THREE.Euler(),
          exploded: false,
          explodeT: 0,
          delay: Math.random() * 0.3,
          mass: 0.6 + Math.random() * 0.8,
        };

        scene.add(mesh);
        fragments.push(mesh);
      }
    }

    // ── Interaction state ─────────────────────
    let isDragging = false;
    let holdTimer = null;
    let interactPos = new THREE.Vector2(9999, 9999); // NDC
    let shatterOrigin = new THREE.Vector3();
    let isShattered = false;
    let reassembleTimer = null;
    let clock = new THREE.Clock();
    let rafId;

    const toNDC = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      return new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
    };

    const ndcToWorld = (ndc) => {
      const v = new THREE.Vector3(ndc.x, ndc.y, 0);
      v.unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(dist));
    };

    const triggerShatter = (worldPos) => {
      if (isShattered) return;
      isShattered = true;
      setHint(false);
      shatterOrigin.copy(worldPos);

      fragments.forEach((f) => {
        const d = f.position.distanceTo(worldPos);
        const force = Math.max(0, (4.5 - d) / 4.5) * (2.5 + Math.random() * 3.0);
        const dir = f.position.clone().sub(worldPos).normalize();

        // Randomise outward direction with z-burst
        dir.z = 0.8 + Math.random() * 1.4;
        dir.x += (Math.random() - 0.5) * 0.8;
        dir.y += (Math.random() - 0.5) * 0.8;
        dir.normalize();

        f.userData.vel = dir.multiplyScalar(force / f.userData.mass);
        f.userData.angVel = new THREE.Euler(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        );
        f.userData.exploded = true;
        f.userData.explodeT = 0;
      });

      // Auto-reassemble after 2.8s
      clearTimeout(reassembleTimer);
      reassembleTimer = setTimeout(reassemble, 2800);
    };

    const reassemble = () => {
      isShattered = false;
      fragments.forEach((f) => {
        f.userData.exploded = false;
        f.userData.vel.set(0, 0, 0);
        f.userData.angVel = new THREE.Euler(0, 0, 0);
      });
    };

    // ── Pointer events ────────────────────────
    const onPointerDown = (e) => {
      isDragging = true;
      const ndc = toNDC(e.clientX, e.clientY);
      interactPos.copy(ndc);

      holdTimer = setTimeout(() => {
        const world = ndcToWorld(ndc);
        triggerShatter(world);
      }, 180); // hold 180ms → shatter
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      clearTimeout(holdTimer);
      const ndc = toNDC(e.clientX, e.clientY);
      interactPos.copy(ndc);
      const world = ndcToWorld(ndc);
      triggerShatter(world);
    };

    const onPointerUp = () => {
      isDragging = false;
      clearTimeout(holdTimer);
    };

    // Touch
    const onTouchStart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      onPointerDown({ clientX: t.clientX, clientY: t.clientY });
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      onPointerMove({ clientX: t.clientX, clientY: t.clientY });
    };
    const onTouchEnd = () => onPointerUp();

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    // ── Mouse parallax (idle) ─────────────────
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ────────────────────────
    const gravity = new THREE.Vector3(0, -0.6, 0);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      // Gentle idle rotation of whole scene
      scene.rotation.y = mouseX * 0.06;
      scene.rotation.x = mouseY * 0.04;

      fragments.forEach((f, i) => {
        if (f.userData.exploded) {
          f.userData.explodeT += dt;
          const t = f.userData.explodeT;

          // Physics: velocity + gravity
          f.userData.vel.addScaledVector(gravity, dt * 0.4);
          f.position.addScaledVector(f.userData.vel, dt);

          // Angular rotation
          f.rotation.x += f.userData.angVel.x * dt;
          f.rotation.y += f.userData.angVel.y * dt;
          f.rotation.z += f.userData.angVel.z * dt;

          // Fade out fragments that go far
          const dist = f.position.distanceTo(f.userData.restPos);
          f.material.opacity = Math.max(0, 1 - dist / 8);
          f.material.transparent = true;
        } else {
          // Return to rest position smoothly
          f.position.lerp(f.userData.restPos, 0.08);
          f.rotation.x = THREE.MathUtils.lerp(f.rotation.x, 0, 0.08);
          f.rotation.y = THREE.MathUtils.lerp(f.rotation.y, 0, 0.08);
          f.rotation.z = THREE.MathUtils.lerp(f.rotation.z, 0, 0.08);
          f.material.opacity = 1;
          f.material.transparent = false;

          // Idle breathing: subtle z-wave
          f.position.z = f.userData.restPos.z +
            Math.sin(elapsed * 0.8 + i * 0.15) * 0.025;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(holdTimer);
      clearTimeout(reassembleTimer);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="hero" className="obs-section" style={{ padding: 0 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "#050505",
          overflow: "hidden",
          cursor: "crosshair",
        }}
      >
        {/* Three.js canvas mount */}
        <div
          ref={mountRef}
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        />

        {/* Hero text overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
          }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            gap: "1rem",
          }}
        >
          {/* Name */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="hero-name-container"
          >
            <h1
              style={{
                fontFamily: "'Prosto One', sans-serif",
                fontSize: "clamp(1.5rem, 7vw, 5.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                textAlign: "center",
                margin: 0,
                lineHeight: 0.9,
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '0.05em',
                color: "#ffffff"
              }}
            >
              {subtitle.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.6 + index * 0.08, ease: [0.34, 1.56, 0.64, 1] }
                  }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.2,
                    skewX: -10,
                    color: '#ffffff',
                    textShadow: '0 0 10px rgba(251, 191, 36, 1), 0 0 30px rgba(139, 92, 246, 0.8), 0 20px 40px rgba(0,0,0,0.6)',
                    transition: { duration: 0.1, ease: "easeOut" }
                  }}
                  style={{
                    display: 'inline-block',
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>
          {/* Role line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.4, 
              transition: { duration: 1.5, ease: "easeOut", delay: 1.5 } 
            }}
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: 'clamp(0.55rem, 1vw, 0.8rem)',
              color: "#ffffff",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              margin: "-0.5rem 0 0",
              fontWeight: 400,
            }}
          >
            Full Stack Developer • CS Student • Still Debugging Life
          </motion.p>
          {/* Purple accent line */}
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "#9d4edd",
              marginTop: "0.5rem",
              boxShadow: "0 0 10px rgba(157, 78, 221, 0.5)"
            }}
          />
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            zIndex: 10
          }}
        >
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.5rem', 
            letterSpacing: '0.3em', 
            opacity: 0.4,
            textTransform: 'uppercase'
          }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)'
            }}
          />
        </motion.div>

        {/* Hint */}
        {hint && (
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              pointerEvents: "none",
              animation: "hintPulse 2s ease-in-out infinite",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "10px",
                color: "#c77dff",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              drag or hold to shatter
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8l6 6 6-6" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* CSS animation inline */}
        <style>{`
          @keyframes hintPulse {
            0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(199, 125, 255, 0.4); }
            50% { opacity: 0.3; text-shadow: none; }
          }
        `}</style>
      </div>
    </section>
  );
}
