// src/components/BackgroundTrail.js
import React, { useState, useEffect, useRef } from 'react';

// 🐾 SVG da pegada
const RabbitFootprintSVG = ({ rotation = "rotate(0deg)" }) => {
  // Paleta adaptada ao fundo do projeto (bg-[#FFF9FA])
  const corLuz = "#FFFFFF"; // Brilho puro para a borda que recebe luz
  const corSombra = "#c9a5a8ff"; // Um rosa/marrom bem acinzentado e clarinho para a sombra
  const corFundo = "#FFF9FA"; // Exatamente a mesma cor do fundo do site

  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      // A rotação continua funcionando perfeitamente
      style={{ transform: rotation }}
    >
      {/* CAMADA 1: Luz (levemente mais clara) - Deslocada para baixo/direita */}
      <ellipse cx="12.5" cy="18.5" rx="4" ry="5" fill={corLuz} />
      <ellipse cx="7.5" cy="10" rx="2" ry="2.5" fill={corLuz} />
      <ellipse cx="12.5" cy="8" rx="2" ry="2.5" fill={corLuz} />
      <ellipse cx="17.5" cy="10" rx="2" ry="2.5" fill={corLuz} /> 
      
      {/* CAMADA 2: Sombra interna (levemente mais escura) - Deslocada para cima/esquerda */}
      <ellipse cx="11.5" cy="17.5" rx="4" ry="5" fill={corSombra} />
      <ellipse cx="6.5" cy="9" rx="2" ry="2.5" fill={corSombra} />
      <ellipse cx="11.5" cy="7" rx="2" ry="2.5" fill={corSombra} />
      <ellipse cx="16.5" cy="9" rx="2" ry="2.5" fill={corSombra} />  
      
      {/* CAMADA 3: Fundo (Cor base) - Centralizada, criando o "fundo" do buraco */}
      <ellipse cx="12" cy="18" rx="4" ry="5" fill={corFundo} />
      <ellipse cx="7" cy="9.5" rx="2" ry="2.5" fill={corFundo} />
      <ellipse cx="12" cy="7.5" rx="2" ry="2.5" fill={corFundo} />
      <ellipse cx="17" cy="9.5" rx="2" ry="2.5" fill={corFundo} />    
    </svg>
  );
};

const MAX_TRAIL_LENGTH = 24; 

export default function BackgroundTrail() {
  const [trail, setTrail] = useState([]);

  const posRef = useRef({ x: 50, y: 90 });
  const angleRef = useRef(-Math.PI / 2);
  
  // 🐇 ref atualizado para controlar o ritmo E a alternância das patas
  const sequenceRef = useRef({ 
    pulosDados: 0, 
    metaDePulos: Math.random() * 3 + 3,
    staggerSign: 1 
  });

  useEffect(() => {
    let timeoutId;

    const performHop = () => {
      setTrail(prev => {
        let { x, y } = posRef.current;
        let angle = angleRef.current;

        const targetAngle = angle + (Math.random() - 0.5) * (Math.PI / 3);
        const newAngle = angle * 0.7 + targetAngle * 0.3; 

        const jumpDistance = 4; 

        const newX = x + jumpDistance * Math.cos(newAngle);
        const newY = y + jumpDistance * Math.sin(newAngle);

        let boundedX = newX;
        let boundedY = newY;
        let bounceAngle = newAngle;

        if (newX < 5 || newX > 95) {
          bounceAngle = Math.PI - newAngle;
          boundedX = Math.max(5, Math.min(95, newX));
        }
        if (newY < 5 || newY > 95) {
          bounceAngle = -newAngle;
          boundedY = Math.max(5, Math.min(95, newY));
        }

        const perpAngle = bounceAngle + Math.PI / 2;

        // 🐾 AJUSTE DAS PATAS
        const footOffset = 1.4; 
        
        // Multiplica o avanço base (1.2) pelo sinal atual (1 ou -1)
        const currentStagger = 0.8 * sequenceRef.current.staggerSign; 
        const outwardTilt = -0.3; 

        const leftX = boundedX + footOffset * Math.cos(perpAngle) - currentStagger * Math.cos(bounceAngle);
        const leftY = boundedY + footOffset * Math.sin(perpAngle) - currentStagger * Math.sin(bounceAngle);

        const rightX = boundedX - footOffset * Math.cos(perpAngle) + currentStagger * Math.cos(bounceAngle);
        const rightY = boundedY - footOffset * Math.sin(perpAngle) + currentStagger * Math.sin(bounceAngle);

        const idBase = Date.now();

        const newSteps = [
          {
            id: idBase,
            x: leftX,
            y: leftY,
            rotation: `rotate(${bounceAngle + Math.PI / 2 - outwardTilt}rad)` 
          },
          {
            id: idBase + 1,
            x: rightX,
            y: rightY,
            rotation:  `rotate(${bounceAngle + Math.PI / 2 + outwardTilt}rad)` 
          }
        ];

        posRef.current = { x: boundedX, y: boundedY };
        angleRef.current = bounceAngle;

        const updated = [...prev, ...newSteps];
        return updated.length > MAX_TRAIL_LENGTH
          ? updated.slice(updated.length - MAX_TRAIL_LENGTH)
          : updated;
      });

      // Inverte o sinal para o próximo pulo (1 vira -1, -1 vira 1)
      sequenceRef.current.staggerSign *= -1;

      // 🕒 LÓGICA DO RITMO
      sequenceRef.current.pulosDados += 1;
      let nextDelay;

      if (sequenceRef.current.pulosDados >= sequenceRef.current.metaDePulos) {
        nextDelay = 1000 + Math.random() * 1000; 
        sequenceRef.current.pulosDados = 0; 
        sequenceRef.current.metaDePulos = Math.floor(Math.random() * 2) + 3; 
      } else {
        nextDelay = 350 + Math.random() * 100; 
      }

      timeoutId = setTimeout(performHop, nextDelay);
    };

    timeoutId = setTimeout(performHop, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {trail.map((step, index) => {
        const reverseIndex = (trail.length - 1) - index;
        const stepOpacity = reverseIndex < 6 ? 0.7 : Math.max(0, 0.7 - ((reverseIndex - 6) * 0.05));

        return (
          <div
            key={step.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[1500ms] ease-out"
            style={{
              left: `${step.x}%`,
              top: `${step.y}%`,
              opacity: stepOpacity
            }}
          >
            <RabbitFootprintSVG rotation={step.rotation} />
          </div>
        );
      })}
    </div>
  );
}