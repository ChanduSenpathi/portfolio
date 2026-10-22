import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// 3D Parametric Elliptical Curve for Real Solid React Orbital Rings
class EllipseCurve3D extends THREE.Curve {
  constructor(xRadius = 7.5, yRadius = 3.2) {
    super();
    this.xRadius = xRadius;
    this.yRadius = yRadius;
  }
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const angle = 2 * Math.PI * t;
    return optionalTarget.set(
      this.xRadius * Math.cos(angle),
      this.yRadius * Math.sin(angle),
      0
    );
  }
}

export default function ThreeCanvas({ theme = 'cyber' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Frontend Development Theme Palettes (Softened for Maximum Foreground Readability)
    const themes = {
      cyber: {
        bg: 0x050711,
        reactCore: 0x00d8ff,
        reactRing: 0x38bdf8,
        accent: 0xa855f7,
        domNode: 0x06b6d4,
        domEdge: 0x22d3ee,
        particles: 0x38bdf8,
        wireframe: 0x1e293b
      },
      cosmic: {
        bg: 0x090514,
        reactCore: 0xf43f5e,
        reactRing: 0xc084fc,
        accent: 0xfb7185,
        domNode: 0xe879f9,
        domEdge: 0xa855f7,
        particles: 0xf472b6,
        wireframe: 0x2e1065
      },
      matrix: {
        bg: 0x030d08,
        reactCore: 0x10b981,
        reactRing: 0x34d399,
        accent: 0x06b6d4,
        domNode: 0x22c55e,
        domEdge: 0x4ade80,
        particles: 0x6ee7b7,
        wireframe: 0x064e3b
      }
    };

    const currentPalette = themes[theme] || themes.cyber;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(currentPalette.bg, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(currentPalette.bg, 0.94);
    container.appendChild(renderer.domElement);

    // ILLUMINATION (Softened so text has 100% legibility)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(currentPalette.reactCore, 3.5, 90);
    pointLight1.position.set(18, 6, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(currentPalette.accent, 3.0, 80);
    pointLight2.position.set(-18, -6, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x38bdf8, 2.5, 80);
    pointLight3.position.set(0, 18, 10);
    scene.add(pointLight3);

    // =========================================================================
    // 1. 3D FRONTEND: ROTATING REACT ATOM (Pushed into periphery at z = -8)
    // =========================================================================
    const reactGroup = new THREE.Group();
    // Positioned safely in upper right margin so it never collides with center text
    reactGroup.position.set(18, 3, -8);
    scene.add(reactGroup);

    // React Central Nucleus (High Contrast Vibrant Glow)
    const nucleusGeo = new THREE.SphereGeometry(2.1, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: currentPalette.reactCore,
      emissive: currentPalette.reactCore,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.7
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    reactGroup.add(nucleus);

    // Outer Aura Shell
    const auraGeo = new THREE.SphereGeometry(2.7, 32, 32);
    const auraMat = new THREE.MeshBasicMaterial({
      color: currentPalette.reactCore,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const aura = new THREE.Mesh(auraGeo, auraMat);
    reactGroup.add(aura);

    // Solid 3D Tubular Orbital Rings (Vibrant Frontend Accent)
    const createSolidReactRing = (rotationZ) => {
      const ringContainer = new THREE.Group();
      ringContainer.rotation.z = rotationZ;

      const curve = new EllipseCurve3D(7.4, 3.1);
      const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.2, 16, true);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: currentPalette.reactRing,
        emissive: currentPalette.reactRing,
        emissiveIntensity: 0.75,
        roughness: 0.25,
        metalness: 0.6
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      ringContainer.add(tubeMesh);

      // Orbiting Electron Bead
      const electronGeo = new THREE.SphereGeometry(0.5, 20, 20);
      const electronMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: currentPalette.reactCore,
        emissiveIntensity: 1.2,
        roughness: 0.1
      });
      const electron = new THREE.Mesh(electronGeo, electronMat);
      ringContainer.add(electron);

      return { ringContainer, electron };
    };

    const ring1 = createSolidReactRing(0);
    const ring2 = createSolidReactRing(Math.PI / 3);
    const ring3 = createSolidReactRing(-Math.PI / 3);

    reactGroup.add(ring1.ringContainer);
    reactGroup.add(ring2.ringContainer);
    reactGroup.add(ring3.ringContainer);

    // =========================================================================
    // 2. 3D FRONTEND: GLOWING JSX CODE TAGS `< / >` (Pushed into far left margin)
    // =========================================================================
    const codeTagGroup = new THREE.Group();
    // Far left peripheral position, z = -8
    codeTagGroup.position.set(-20, -1, -8);
    scene.add(codeTagGroup);

    const tagMat = new THREE.MeshStandardMaterial({
      color: currentPalette.accent,
      emissive: currentPalette.accent,
      emissiveIntensity: 0.75,
      roughness: 0.25,
      metalness: 0.7
    });

    const bracketGeo = new THREE.CylinderGeometry(0.25, 0.25, 4.6, 20);

    // Left angle bracket `<`
    const leftTop = new THREE.Mesh(bracketGeo, tagMat);
    leftTop.rotation.z = Math.PI / 3.6;
    leftTop.position.set(-4.2, 1.5, 0);
    codeTagGroup.add(leftTop);

    const leftBottom = new THREE.Mesh(bracketGeo, tagMat);
    leftBottom.rotation.z = -Math.PI / 3.6;
    leftBottom.position.set(-4.2, -1.5, 0);
    codeTagGroup.add(leftBottom);

    // Slash `/`
    const slashGeo = new THREE.CylinderGeometry(0.25, 0.25, 6.2, 20);
    const slashMesh = new THREE.Mesh(slashGeo, tagMat);
    slashMesh.rotation.z = Math.PI / 5.2;
    slashMesh.position.set(-0.8, 0, 0);
    codeTagGroup.add(slashMesh);

    // Right angle bracket `>`
    const rightTop = new THREE.Mesh(bracketGeo, tagMat);
    rightTop.rotation.z = -Math.PI / 3.6;
    rightTop.position.set(2.6, 1.5, 0);
    codeTagGroup.add(rightTop);

    const rightBottom = new THREE.Mesh(bracketGeo, tagMat);
    rightBottom.rotation.z = Math.PI / 3.6;
    rightBottom.position.set(2.6, -1.5, 0);
    codeTagGroup.add(rightBottom);

    // =========================================================================
    // 3. 3D FRONTEND: VIRTUAL DOM TREE (Pushed up and deeper at z = -14)
    // =========================================================================
    const domGroup = new THREE.Group();
    domGroup.position.set(0, 15, -14);
    scene.add(domGroup);

    const domNodes = [
      { x: 0, y: 3.2, z: 0, root: true },
      { x: -5.5, y: 0.4, z: 1 },
      { x: 0, y: 0.4, z: 0 },
      { x: 5.5, y: 0.4, z: -1 },
      { x: -7.5, y: -2.8, z: 1.5 },
      { x: -3.5, y: -2.8, z: 0.5 },
      { x: 3.5, y: -2.8, z: 0 },
      { x: 7.5, y: -2.8, z: -1.5 }
    ];

    const domEdges = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 4],
      [1, 5],
      [3, 6],
      [3, 7]
    ];

    const nodeMat = new THREE.MeshStandardMaterial({
      color: currentPalette.domNode,
      emissive: currentPalette.domNode,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      metalness: 0.6
    });

    domNodes.forEach((n) => {
      const radius = n.root ? 0.9 : 0.65;
      const g = new THREE.SphereGeometry(radius, 20, 20);
      const m = new THREE.Mesh(g, nodeMat);
      m.position.set(n.x, n.y, n.z);
      domGroup.add(m);
    });

    const edgeMat = new THREE.MeshStandardMaterial({
      color: currentPalette.domEdge,
      emissive: currentPalette.domEdge,
      emissiveIntensity: 0.65,
      roughness: 0.3
    });

    domEdges.forEach(([i, j]) => {
      const p1 = new THREE.Vector3(domNodes[i].x, domNodes[i].y, domNodes[i].z);
      const p2 = new THREE.Vector3(domNodes[j].x, domNodes[j].y, domNodes[j].z);
      const distance = p1.distanceTo(p2);

      const cylinderGeo = new THREE.CylinderGeometry(0.1, 0.1, distance, 10);
      const cylinderMesh = new THREE.Mesh(cylinderGeo, edgeMat);
      cylinderMesh.position.copy(p1).add(p2).multiplyScalar(0.5);
      cylinderMesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        p2.clone().sub(p1).normalize()
      );
      domGroup.add(cylinderMesh);
    });

    // =========================================================================
    // 4. FLOATING FRONTEND TECH BADGES (Pushed to wide sides with soft opacity)
    // =========================================================================
    const techBadges = [
      'React 19',
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      '{ JSX }',
      '<Component />',
      'useState()',
      'Vitest CI/CD',
      'Prisma ORM',
      'Redux Toolkit',
      'REST APIs'
    ];

    const createTextSprite = (text, isAlternate = false) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 160;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgba(7, 12, 26, 0.88)';
      ctx.strokeStyle = isAlternate ? 'rgba(216, 180, 254, 0.95)' : 'rgba(56, 189, 248, 0.95)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(16, 16, 480, 128, 64);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 44px "JetBrains Mono", monospace';
      ctx.fillStyle = isAlternate ? '#f3e8ff' : '#e0f2fe';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, 82);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.82 // Crisp, high contrast floating frontend badges
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(5.5, 1.7, 1);
      return sprite;
    };

    const techSpritesGroup = new THREE.Group();
    scene.add(techSpritesGroup);

    const spritesData = techBadges.map((badge, idx) => {
      const isAlt = idx % 2 === 1;
      const sprite = createTextSprite(badge, isAlt);
      const angle = (idx / techBadges.length) * Math.PI * 2;
      const radius = 23 + (idx % 3) * 4; // Wide peripheral radius
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * 13 + (idx % 2 === 0 ? 2 : -2);
      const z = -12 + (idx % 3) * -4; // Deep Z-layer

      sprite.position.set(x, y, z);
      techSpritesGroup.add(sprite);

      return {
        sprite,
        baseY: y,
        speed: 0.6 + (idx % 3) * 0.2,
        offset: idx * 0.6
      };
    });

    // =========================================================================
    // 5. 3D FRONTEND: REACTIVE DATA WAVE GRID (Subtle wireframe at base)
    // =========================================================================
    const gridGeo = new THREE.PlaneGeometry(80, 50, 40, 25);
    const gridMat = new THREE.MeshBasicMaterial({
      color: currentPalette.wireframe,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const waveGrid = new THREE.Mesh(gridGeo, gridMat);
    waveGrid.rotation.x = -Math.PI / 2.3;
    waveGrid.position.set(0, -18, -12);
    scene.add(waveGrid);

    // =========================================================================
    // 6. GLOWING STAR & CODE DUST PARTICLES
    // =========================================================================
    const particleCount = 500;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 80;
      posArray[i + 1] = (Math.random() - 0.5) * 80;
      posArray[i + 2] = (Math.random() - 0.5) * 40;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.38,
      transparent: true,
      opacity: 0.45,
      color: currentPalette.particles
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // =========================================================================
    // MOUSE PARALLAX (Fixed background, stays in place on scroll)
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION RENDER LOOP
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 3.5;
      camera.position.y = mouseY * 2.5;
      camera.lookAt(0, 0, 0);

      // 1. Rotate 3D React Atom
      reactGroup.rotation.y = t * 0.35 + mouseX * 0.4;
      reactGroup.rotation.x = Math.sin(t * 0.25) * 0.2 + mouseY * 0.3;
      reactGroup.position.y = 3 + Math.sin(t * 1.0) * 1.0;

      // Orbit electrons at varied speeds
      const eSpeed1 = t * 2.2;
      ring1.electron.position.set(Math.cos(eSpeed1) * 7.4, Math.sin(eSpeed1) * 3.1, 0);

      const eSpeed2 = t * 2.5 + 1.2;
      ring2.electron.position.set(Math.cos(eSpeed2) * 7.4, Math.sin(eSpeed2) * 3.1, 0);

      const eSpeed3 = t * 2.8 + 2.4;
      ring3.electron.position.set(Math.cos(eSpeed3) * 7.4, Math.sin(eSpeed3) * 3.1, 0);

      const auraScale = 1 + Math.sin(t * 2.5) * 0.06;
      aura.scale.set(auraScale, auraScale, auraScale);

      // 2. Rotate Code Tag `< / >`
      codeTagGroup.rotation.y = t * 0.25 - mouseX * 0.3;
      codeTagGroup.rotation.z = Math.sin(t * 0.3) * 0.15;
      codeTagGroup.position.y = -1 + Math.cos(t * 1.0) * 0.8;

      // 3. Virtual DOM tree gentle sway
      domGroup.rotation.y = Math.sin(t * 0.4) * 0.25 + mouseX * 0.25;
      domGroup.position.y = 15 + Math.sin(t * 0.7) * 0.6;

      // 4. Floating tech badge sprites gentle levitation
      spritesData.forEach((item) => {
        item.sprite.position.y = item.baseY + Math.sin(t * item.speed + item.offset) * 1.2;
      });

      // 5. Undulate Wave Grid
      const positionAttr = gridGeo.attributes.position;
      for (let i = 0; i < positionAttr.count; i++) {
        const u = positionAttr.getX(i);
        const v = positionAttr.getY(i);
        const z = Math.sin(u * 0.2 + t * 1.2) * 0.6 + Math.cos(v * 0.2 + t * 1.0) * 0.4;
        positionAttr.setZ(i, z);
      }
      positionAttr.needsUpdate = true;

      // 6. Star dust slow drift
      particlesMesh.rotation.y = t * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.92,
        transition: 'opacity 0.4s ease-in-out'
      }}
    />
  );
}
