import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const LineVertexShader = `
  uniform float time;
  uniform float focale;
  uniform float nbLines;
  uniform vec3 config;
  
  varying vec2 vUv;
  varying float vOpacity;
  
  #define PI 3.1415926535897932384626433832795
  
  void main() {
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
    gl_Position = projectionMatrix * mvPosition;
    
    float lineIndex = uv.x;
    float z = mvPosition.z;
    float zmax = 400.0;
    float depth = focale / -(z - focale);
    float zAnim = smoothstep(0.0, 1.0, sin(lineIndex * 13.0 + time * 0.3) * 0.5 + 0.5);
    float opacity = (zmax + z) / zmax * depth * zAnim * 0.75;
    
    vOpacity = max(opacity, 0.0);
  }
`;

const LineFragmentShader = `
  uniform vec3 config;
  uniform float time;
  
  varying vec2 vUv;
  varying float vOpacity;
  
  void main() {
    float lineIndex = vUv.x;
    float animation = smoothstep(0.0, 1.0, sin(lineIndex * 13.0 + time * 0.3) * 0.5 + 0.5);
    vec4 col = vec4(vec3(0.831, 0.686, 0.215) * animation, vOpacity);
    gl_FragColor = col;
  }
`;

const ParticleVertexShader = `
  uniform float time;
  uniform vec2 mouse;
  uniform float size;
  uniform sampler2D random;
  
  attribute float size;
  
  varying vec3 vColor;
  
  void main() {
    vec3 pos = position;
    
    float rotZ = mouse.y + time * 0.2 * (1.0 + position.z / 200.0);
    mat3 rotMatrix = mat3(
      cos(rotZ), -sin(rotZ), 0.0,
      sin(rotZ), cos(rotZ), 0.0,
      0.0, 0.0, 1.0
    );
    
    pos = rotMatrix * pos;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (200.0 / -mvPosition.z);
    vColor = vec3(1.0, 0.95, 0.8);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const ParticleFragmentShader = `
  uniform sampler2D random;
  
  varying vec3 vColor;
  
  void main() {
    vec4 texColor = texture2D(random, gl_PointCoord);
    float alpha = texColor.a;
    gl_FragColor = vec4(vColor, alpha * 0.85);
  }
`;

function createDataTexture(): { texture: THREE.DataTexture; data: Uint8Array } {
  const size = 256;
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size * 4; i++) {
    data[i] = Math.floor(Math.random() * 256);
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;
  return { texture, data };
}

export default function GlobalEliteConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002);
    scene.background = new THREE.Color(0x050505);

    const group = new THREE.Group();
    scene.add(group);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 500;

    const { texture: dataTexture, data: randomData } = createDataTexture();

    function getRandom(seed: number): number {
      const pixelIndex = Math.floor(seed * 256) * 4;
      const pixelValue = randomData[pixelIndex];
      return ((pixelValue || 128) / 255);
    }

    const u: Record<string, { value: unknown }> = {
      time: { value: 0.0 },
      focale: { value: 350.0 },
      mouse: { value: new THREE.Vector2(0.0, 0.0) },
      config: { value: new THREE.Vector3(0.0, 0.0, 0.0) },
      nbLines: { value: 100.0 },
      nbParticles: { value: 350.0 },
      random: { value: dataTexture },
    };

    // Particle System
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...u,
        size: { value: 4.0 },
      },
      vertexShader: ParticleVertexShader,
      fragmentShader: ParticleFragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 350;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let rx = getRandom(30 + i);
      let ry = getRandom(40 + i);
      let rz = getRandom(50 + i);
      rx = (rx - 0.5) * 2;
      ry = (ry - 0.5) * 2;
      rz = (rz - 0.5) * 2;

      positions[i3] = rx * 400;
      positions[i3 + 1] = ry * 400;
      positions[i3 + 2] = rz * 400;

      sizes[i] = getRandom(50 + i) * 3;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizes, 1)
    );

    const particleSystem = new THREE.Points(
      particlesGeometry,
      particleMaterial
    );
    group.add(particleSystem);

    particleSystem.userData = { velocities: [] as { x: number; y: number; z: number }[] };
    const posArray = particlesGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < posArray.length; i += 3) {
      particleSystem.userData.velocities.push({ x: 0, y: 0, z: 0 });
    }

    // Line System
    const linesGeometry = new THREE.BufferGeometry();
    const MAX_POINTS = 100 * 300;
    const linePositions = new Float32Array(MAX_POINTS * 3);
    linesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.ShaderMaterial({
      uniforms: u,
      vertexShader: LineVertexShader,
      fragmentShader: LineFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    group.add(linesMesh);

    // Initialize Lines
    function initLines(
      pSystem: THREE.Points,
      lMesh: THREE.LineSegments
    ) {
      const pos = pSystem.geometry.attributes.position.array as Float32Array;
      const segmentCount = 100;
      let writeIndex = 0;

      for (let i = 0; i < segmentCount; i++) {
        const particleIndex = Math.floor(getRandom(i) * 350);
        const startPoint = new THREE.Vector3(
          pos[particleIndex * 3],
          pos[particleIndex * 3 + 1],
          pos[particleIndex * 3 + 2]
        );

        const linePoints: THREE.Vector3[] = [startPoint.clone()];
        const numPoints = 5 + Math.floor(getRandom(i + 100) * 15);
        const currentPos = startPoint.clone();

        for (let p = 0; p < numPoints - 1; p++) {
          const scaleFactor = 20.0;
          const offsetX = (getRandom(i * numPoints + p) - 0.5) * scaleFactor;
          const offsetY = (getRandom(i * numPoints + p + 500) - 0.5) * scaleFactor;
          const offsetZ = (getRandom(i * numPoints + p + 1000) - 0.5) * scaleFactor;
          currentPos.add(new THREE.Vector3(offsetX, offsetY, offsetZ));
          linePoints.push(currentPos.clone());
        }

        const curve = new THREE.CatmullRomCurve3(linePoints, false, 'catmullrom', 0.5);
        const subdividedPoints = curve.getPoints(100);

        for (const pt of subdividedPoints) {
          if (writeIndex < MAX_POINTS * 3 - 3) {
            linePositions[writeIndex++] = pt.x;
            linePositions[writeIndex++] = pt.y;
            linePositions[writeIndex++] = pt.z;
          }
        }
      }

      lMesh.geometry.attributes.position.needsUpdate = true;
    }

    initLines(particleSystem, linesMesh);

    // Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let scrollPos = 0;

    function onDocumentMouseMove(event: MouseEvent) {
      mouseX = (event.clientX - windowHalfX) * 2;
      mouseY = (event.clientY - windowHalfY) * 2;
    }

    function onDocumentMouseWheel(event: WheelEvent) {
      scrollPos += event.deltaY * 0.1;
      scrollPos = Math.max(-200, Math.min(scrollPos, 600));
    }

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('wheel', onDocumentMouseWheel);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      lineMaterial.uniforms.time.value = time;
      particleMaterial.uniforms.time.value = time;

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      group.rotation.y += 0.05 * (targetX - group.rotation.y);
      group.rotation.x += 0.05 * (targetY - group.rotation.x);

      camera.position.z += (scrollPos - camera.position.z) * 0.1;

      particleMaterial.uniforms.mouse.value.set(
        group.rotation.x,
        group.rotation.y
      );

      renderer.render(scene, camera);
    }

    animate();

    // Resize
    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('wheel', onDocumentMouseWheel);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particleMaterial.dispose();
      linesGeometry.dispose();
      lineMaterial.dispose();
      dataTexture.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
