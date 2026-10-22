import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  className?: string;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Group to hold all rotating elements
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central faceted core (Icosahedron with double material)
    const coreGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    
    // Translucent glass-like inner surface
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x081528,
      emissive: 0x02162e,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    // Glowing cyan wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireframeMesh = new THREE.Mesh(coreGeometry, wireframeMaterial);
    wireframeMesh.scale.setScalar(1.02);
    rootGroup.add(wireframeMesh);

    // Inner glowing energy sphere
    const innerNucleusGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerNucleusMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.6,
    });
    const innerNucleus = new THREE.Mesh(innerNucleusGeo, innerNucleusMat);
    rootGroup.add(innerNucleus);

    // 2. Orbital Cybernetic Rings
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    const ringGeometries: THREE.BufferGeometry[] = [];
    const ringMaterials: THREE.Material[] = [];

    const createRing = (radius: number, tube: number, color: number, rotX: number, rotY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6,
      });
      ringGeometries.push(ringGeo);
      ringMaterials.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    };

    const ring1 = createRing(2.3, 0.018, 0x00f2fe, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(2.7, 0.015, 0x10b981, -Math.PI / 4, Math.PI / 4);
    const ring3 = createRing(3.1, 0.012, 0x8b5cf6, Math.PI / 2.2, -Math.PI / 5);

    ringGroup.add(ring1);
    ringGroup.add(ring2);
    ringGroup.add(ring3);

    // 3. Floating Data Particles / Constellation Nodes
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f2fe);
    const emeraldColor = new THREE.Color(0x10b981);
    const amberColor = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a spherical cloud around the core
      const radius = 2.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? cyanColor : i % 3 === 1 ? emeraldColor : amberColor;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particles);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x00f2fe, 3, 20);
    pointLightCyan.position.set(4, 3, 4);
    scene.add(pointLightCyan);

    const pointLightEmerald = new THREE.PointLight(0x10b981, 2.5, 20);
    pointLightEmerald.position.set(-4, -3, 3);
    scene.add(pointLightEmerald);

    const backRimLight = new THREE.PointLight(0x8b5cf6, 2, 15);
    backRimLight.position.set(0, 4, -4);
    scene.add(backRimLight);

    // Pointer Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.45;
      mouseY = y * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll interaction
    let scrollProgress = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollProgress = Math.min(scrollY / 800, 1.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Responsive Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop with Performance Optimization (pause when off-screen)
    let animationFrameId: number;
    let isVisible = true;

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) {
        animate();
      }
    }, { threshold: 0.05 });
    intersectionObserver.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        coreMesh.rotation.y += delta * 0.25;
        coreMesh.rotation.x += delta * 0.15;
        wireframeMesh.rotation.y += delta * 0.25;
        wireframeMesh.rotation.x += delta * 0.15;

        ring1.rotation.z += delta * 0.35;
        ring2.rotation.z -= delta * 0.28;
        ring3.rotation.y += delta * 0.22;

        particles.rotation.y = time * 0.06;
        particles.rotation.x = Math.sin(time * 0.1) * 0.1;

        // Subtle pulsing core breathing
        const pulse = 1 + Math.sin(time * 2.2) * 0.04;
        innerNucleus.scale.setScalar(pulse);

        // Smooth damping towards pointer position
        targetRotationY += (mouseX - targetRotationY) * 0.05;
        targetRotationX += (mouseY - targetRotationX) * 0.05;

        rootGroup.rotation.y = targetRotationY + (scrollProgress * 0.6);
        rootGroup.rotation.x = -targetRotationX;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsInteractive(true);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeMaterial.dispose();
      innerNucleusGeo.dispose();
      innerNucleusMat.dispose();
      ringGeometries.forEach((g) => g.dispose());
      ringMaterials.forEach((m) => m.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={containerRef}
        className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        aria-hidden="true"
      />

      {/* Fallback / Loading Glow Layer */}
      {(!hasWebGL || !isInteractive) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-cyan-500/30 bg-gradient-to-tr from-cyan-950/40 via-dark-900 to-emerald-950/40 flex items-center justify-center shadow-[0_0_60px_rgba(0,242,254,0.15)] animate-pulse-slow">
            <div className="w-32 h-32 rounded-full border border-emerald-500/40 border-dashed animate-spin-slow" />
            <div className="absolute text-cyan-400 font-mono text-xs tracking-wider">NK • 3D CORE</div>
          </div>
          <p className="mt-4 text-xs font-mono text-slate-400">
            {!hasWebGL ? 'Hardware acceleration disabled — static projection active' : 'Calibrating holographic matrix...'}
          </p>
        </div>
      )}

      {/* Subtle Spatial Coordinate Watermark */}
      <div className="absolute bottom-3 right-4 hidden sm:flex items-center gap-2 pointer-events-none opacity-40 hover:opacity-80 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-mono text-[10px] tracking-widest text-cyan-400/80">
          WEBGL 3D MATRIX • 60 FPS
        </span>
      </div>
    </div>
  );
};
