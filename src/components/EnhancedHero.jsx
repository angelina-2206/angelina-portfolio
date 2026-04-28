import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// ── Text Scramble Hook ──────────────────────────────────────────
function useScramble(text, active, delay = 0) {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-[]{}—+*^?#∎·";
  const [display, setDisplay] = useState(text.replace(/[^\n ]/g, "█"));
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      let frame = 0;
      const lines = text.split("\n");
      const flat = text.replace("\n", "");
      const total = flat.length * 3 + 20;

      const tick = () => {
        let fi = 0;
        const result = lines.map(line => {
          let out = "";
          for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === " ") {
              out += " ";
              fi++;
              continue;
            }
            if (frame > fi * 3 + 20) {
              out += ch;
            } else if (frame > fi * 2) {
              out += CHARS[Math.floor(Math.random() * CHARS.length)];
            } else {
              out += "█";
            }
            fi++;
          }
          return out;
        });
        setDisplay(result.join("\n"));
        frame++;
        if (frame < total) rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, text, delay]);

  return display;
}

// ── Intersection Observer Hook ──────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

const GRID_COLS = 20;
const GRID_ROWS = 14;

// ── Main Hero Component ────────────────────────────────────────
export default function Hero() {
  const [sectionRef, inView] = useInView(0.1);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const nameDisplay = useScramble("ANGELINA\nCHATTERJEE", inView, 200);

  const mountRef = useRef(null);
  const [hint, setHint] = useState(true);

  // THREE.js Scene setup
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

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const jitter = () => (Math.random() - 0.5) * 0.08;
        const x0 = -4 + c * fW + jitter();
        const y0 = -2.25 + r * fH + jitter();
        const x1 = x0 + fW + jitter();
        const y1 = y0 + fH + jitter();
        const cx = (x0 + x1) / 2;
        const cy = (y0 + y1) / 2;
        const depth = 0.04 + Math.random() * 0.08;

        const geo = new THREE.BoxGeometry((x1 - x0) * 0.92, (y1 - y0) * 0.92, depth);

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
    let interactPos = new THREE.Vector2(9999, 9999);
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

    const onPointerDown = (e) => {
      isDragging = true;
      const ndc = toNDC(e.clientX, e.clientY);
      interactPos.copy(ndc);
      holdTimer = setTimeout(() => {
        const world = ndcToWorld(ndc);
        triggerShatter(world);
      }, 180);
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

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const gravity = new THREE.Vector3(0, -0.6, 0);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      scene.rotation.y = mouseX * 0.06;
      scene.rotation.x = mouseY * 0.04;

      fragments.forEach((f, i) => {
        if (f.userData.exploded) {
          f.userData.explodeT += dt;
          const t = f.userData.explodeT;
          f.userData.vel.addScaledVector(gravity, dt * 0.4);
          f.position.addScaledVector(f.userData.vel, dt);
          f.rotation.x += f.userData.angVel.x * dt;
          f.rotation.y += f.userData.angVel.y * dt;
          f.rotation.z += f.userData.angVel.z * dt;
          const dist = f.position.distanceTo(f.userData.restPos);
          f.material.opacity = Math.max(0, 1 - dist / 8);
          f.material.transparent = true;
        } else {
          f.position.lerp(f.userData.restPos, 0.08);
          f.rotation.x = THREE.MathUtils.lerp(f.rotation.x, 0, 0.08);
          f.rotation.y = THREE.MathUtils.lerp(f.rotation.y, 0, 0.08);
          f.rotation.z = THREE.MathUtils.lerp(f.rotation.z, 0, 0.08);
          f.material.opacity = 1;
          f.material.transparent = false;
          f.position.z = f.userData.restPos.z + Math.sin(elapsed * 0.8 + i * 0.15) * 0.025;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

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

  const handleViewWork = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
        overflow: "hidden",
        padding: "2rem",
      }}
    >
      {/* 3D Shatter canvas mount */}
      <div
        ref={mountRef}
        style={{ position: "absolute", inset: 0, zIndex: 1, cursor: "crosshair" }}
      />



      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)",
          zIndex: 2,
          pointerEvents: "none",
          opacity: inView ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      />

      {/* Main content container */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          pointerEvents: "none", // so interactions hit the 3d canvas
        }}
      >
        {/* Scrambled Name */}
        <h1
          style={{
            fontSize: "clamp(3rem, 8.5vw, 10rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#F0EEF6",
            whiteSpace: "pre-wrap",
            marginBottom: "0.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            fontFamily: "var(--font-display)",
          }}
        >
          {nameDisplay}
        </h1>

        {/* Tagline — Your voice */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#F0EEF6",
            lineHeight: 1.4,
            marginBottom: "0.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span style={{ color: "#8B5CF6" }}>STILL DEBUGGING LIFE.</span>
          <br />
          <span style={{ color: "#F0EEF6" }}>SHIPPING CODE.</span>
        </p>

        {/* Divider line */}
        <div
          style={{
            width: "60px",
            height: "2px",
            background: "linear-gradient(90deg, #8B5CF6, #00D2BE)",
            borderRadius: "2px",
            margin: "1rem 0",
            opacity: inView ? 1 : 0,
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "center",
            transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
          }}
        />

        {/* CTA Button */}
        <button
          onMouseEnter={() => setHoveredBtn(true)}
          onMouseLeave={() => setHoveredBtn(false)}
          onClick={handleViewWork}
          style={{
            marginTop: "1.5rem",
            padding: "12px 28px",
            background: hoveredBtn ? "rgba(139,92,246,0.12)" : "transparent",
            border: `1.5px solid ${hoveredBtn ? "#8B5CF6" : "rgba(139,92,246,0.5)"}`,
            borderRadius: "8px",
            color: "#8B5CF6",
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            transform: hoveredBtn ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hoveredBtn ? "0 12px 28px rgba(139,92,246,0.25)" : "none",
            opacity: inView ? 1 : 0,
            transitionDelay: "0.7s",
            pointerEvents: "auto", // allow button click
          }}
        >
          VIEW MY WORK ↓
        </button>
      </div>

      {/* Bottom Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 4vh, 2.5rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          pointerEvents: "none",
        }}
      >
        {hint && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              animation: "hintPulse 2s ease-in-out infinite",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            animation: "bounce 2s ease-in-out infinite",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            EXPLORE
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "rgba(139,92,246,0.6)",
              animation: "chevronBounce 1.8s ease-in-out infinite",
            }}
          >
            ↓
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-12px); }
        }

        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }

        @keyframes hintPulse {
          0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(199, 125, 255, 0.4); }
          50% { opacity: 0.3; text-shadow: none; }
        }
      `}</style>
    </section>
  );
}
