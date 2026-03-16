import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

/* =====================================================
   TEXTURA PROCEDURAL DA CASCA CROCANTE (AMENDOIM)
===================================================== */

function createCrocanteTexture() {
  const size = 1024;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 12000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;

    const r = Math.random() * 20 + 2;

    const shade = Math.random() * 200;

    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  texture.repeat.set(2, 2);

  texture.needsUpdate = true;

  return texture;
}

/* =====================================================
   TOPPINGS (COBERTURAS MAIS REALISTAS)
===================================================== */

function Toppings({ tipo }) {
  // Quantidades ajustadas por tipo para não pesar e parecer natural
  const count = tipo === "confete" ? 60 : 35;
  const meshes = [];

  for (let i = 0; i < count; i++) {
    const r = Math.sqrt(Math.random()) * 0.88;
    const theta = Math.random() * Math.PI * 2;

    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    let materialProps = {
      color: "#2e1509",
      roughness: 0.7,
      clearcoat: 0.1,
      clearcoatRoughness: 0.5,
    };
    
    // Geometria padrão caso não identifique
    let geometry = <boxGeometry args={[0.07, 0.07, 0.07]} />;

    if (tipo === "kitkat") {
      // KitKat: Retângulo texturizado/arredondado de chocolate ao leite
      geometry = <boxGeometry args={[0.18, 0.06, 0.04]} />;
      materialProps = {
        color: "#5c2a16",
        roughness: 0.45,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
      };
    } else if (tipo === "bis") {
      // Bis: Mais quadradinho, chocolate levemente mais escuro e fosco
      geometry = <boxGeometry args={[0.14, 0.08, 0.06]} />;
      materialProps = {
        color: "#3d1b0d",
        roughness: 0.6,
        clearcoat: 0.2,
        clearcoatRoughness: 0.4,
      };
    } else if (tipo === "confete") {
      // Confete/M&Ms: Discos achatados e muito polidos/brilhantes
      const colors = [
        "#e52b2b", // Vermelho
        "#3ec92e", // Verde
        "#276ee3", // Azul
        "#f0d518", // Amarelo
        "#e03db5", // Rosa
        "#e67519", // Laranja
      ];
      materialProps = {
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.15, // Muito liso
        clearcoat: 1.0,  // Super brilhante (casquinha de açúcar)
        clearcoatRoughness: 0.1,
      };
      
      // Criando uma esfera achatada para simular o M&M
      geometry = <sphereGeometry args={[0.045, 16, 16]} />;
    } else if (tipo === "oreo") {
      // Oreo: Cilindro escuro, fosco e com textura porosa
      materialProps = {
        color: "#1c1a1a",
        roughness: 0.9,
        clearcoat: 0.0,
      };
      geometry = <cylinderGeometry args={[0.06, 0.06, 0.025, 24]} />;
    }

    meshes.push(
      <mesh
        key={i}
        position={[x, y, tipo === "confete" ? 0.02 : 0.03 + Math.random() * 0.02]}
        rotation={[
          // Rotações mais naturais dependendo do doce
          tipo === "confete" ? 0 : Math.random() * Math.PI,
          tipo === "confete" ? 0 : Math.random() * Math.PI,
          Math.random() * Math.PI,
        ]}
        scale={tipo === "confete" ? [1, 1, 0.5] : [1, 1, 1]} // Achata o confete
        castShadow
        receiveShadow
      >
        {geometry}
        <meshPhysicalMaterial {...materialProps} />
      </mesh>
    );
  }

  return <group>{meshes}</group>;
}

/* =====================================================
   OVO 3D
===================================================== */

function Ovo({ pedido }) {
  const crocanteTexture = useMemo(() => createCrocanteTexture(), []);

  const corCasca =
    pedido.saborCasca === "branco"
      ? "#e7cf91"
      : pedido.saborCasca === "amargo"
        ? "#2b1108"
        : "#4a2511";

  const isCrocante = pedido.tipoCasca === "crocante";

  const coresRecheio = {
    brigadeiro: "#2e1509",
    beijinho: "#f9e5c4",
    ninho_nutella: "#fdf5e6",
    maracuja: "#ffcc00",
    sensacao: "#ff6699",
    pacoca: "#c29b6e",
  };

  const corRecheio = coresRecheio[pedido.recheio] || "#2e1509";

  const escalaTamanho =
    {
      150: 0.85,
      300: 1,
      500: 1.15,
    }[pedido.tamanho] || 1;

  const segments = isCrocante ? 512 : 128;

  // Resolve a rebarba: A lisa volta a ter raio 1 perfeito, a crocante alarga para esconder o amendoim
  const raioExternoBorda = isCrocante ? 1.05 : 1;

  return (
    <group scale={escalaTamanho}>
      <group rotation={[0.2, -Math.PI / 2 + 0.4, 0]}>
        <group scale={[1, 1.35, 1]}>
          {/* CASCA EXTERNA */}
          <mesh>
            <sphereGeometry args={[1, segments, segments, 0, Math.PI]} />

            <meshPhysicalMaterial
              color={corCasca}
              side={THREE.DoubleSide}
              // Resolve o bug do shader: a textura é sempre passada, mas zeramos a escala se for lisa
              displacementMap={crocanteTexture}
              displacementScale={isCrocante ? 0.05 : 0}
              bumpMap={crocanteTexture}
              bumpScale={isCrocante ? 0.25 : 0}
              roughness={isCrocante ? 0.45 : 0.25}
              metalness={0.05}
              clearcoat={isCrocante ? 0.1 : 0.8}
              clearcoatRoughness={isCrocante ? 0.4 : 0.1}
            />
          </mesh>

          {/* CASCA INTERNA (Tradicional e Trufado) */}
          {(pedido.tipoOvo === "tradicional" ||
            pedido.tipoOvo === "trufado") && (
            <mesh scale={pedido.tipoOvo === "trufado" ? 0.85 : 0.96}>
              <sphereGeometry args={[1, 128, 128, 0, Math.PI]} />
              <meshPhysicalMaterial
                color={corCasca}
                side={THREE.DoubleSide}
                roughness={0.3}
                clearcoat={0.6}
                clearcoatRoughness={0.2}
              />
            </mesh>
          )}

          {/* RECHEIO (Apenas Trufado) */}
          {pedido.tipoOvo === "trufado" && (
            <mesh scale={0.96}>
              <sphereGeometry args={[1, 128, 128, 0, Math.PI]} />
              <meshPhysicalMaterial
                color={corRecheio}
                side={THREE.DoubleSide}
                roughness={0.5}
                clearcoat={0.2}
                clearcoatRoughness={0.3}
              />
            </mesh>
          )}

          {/* PLANO DE CORTE (Borda e Cobertura) */}
          {/* Resolve o alinhamento: exatos 90 graus no eixo Y para fechar a meia esfera perfeitamente */}
          <group rotation={[0, 3.15, 0]}>
            <mesh>
              <ringGeometry args={[0.96, raioExternoBorda, 128]} />
              <meshPhysicalMaterial
                color={corCasca}
                side={THREE.DoubleSide}
                roughness={0.3}
                clearcoat={0.5}
                clearcoatRoughness={0.2}
              />
            </mesh>

            {pedido.tipoOvo === "colher" && (
              <group position={[0, 0, -0.04]}>
                <mesh>
                  <circleGeometry args={[0.96, 128]} />
                  <meshPhysicalMaterial
                    color={corRecheio}
                    roughness={0.6}
                    clearcoat={0.2}
                    clearcoatRoughness={0.3}
                  />
                </mesh>

                {pedido.cobertura && <Toppings tipo={pedido.cobertura} />}
              </group>
            )}
          </group>
        </group>
      </group>
    </group>
  );
}
/* =====================================================
   SCENE
===================================================== */

export default function EggViewer({ pedido }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <ambientLight intensity={0.6} />

      <directionalLight position={[5, 10, 5]} intensity={2.0} />

      <directionalLight position={[-5, 5, -5]} intensity={0.8} />

      <spotLight
        position={[3, 4, 3]}
        intensity={2.5}
        angle={0.4}
        penumbra={1}
        castShadow
      />

      <Environment preset="studio" />

      <Ovo pedido={pedido} />

      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.4}
        scale={5}
        blur={2.5}
      />

      <OrbitControls enableZoom minDistance={2.5} maxDistance={6} />
    </Canvas>
  );
}
