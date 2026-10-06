import React, { useEffect, useRef } from 'react';

export default function WindLeavesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Warm, organic leaf & petal color palette (soft olive, terracotta, warm taupe, sage)
    const leafColors = [
      'rgba(142, 124, 104, 0.35)', // warm taupe
      'rgba(163, 145, 123, 0.3)',  // soft dry leaf
      'rgba(120, 134, 117, 0.28)', // subtle sage green
      'rgba(184, 140, 110, 0.25)', // soft clay
      'rgba(196, 174, 145, 0.35)'  // parchment gold
    ];

    // Create drifting leaves
    const particleCount = window.innerWidth < 768 ? 20 : 35;
    const leaves = [];

    for (let i = 0; i < particleCount; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 6,
        speedX: Math.random() * 0.8 + 0.5, // gentle horizontal breeze
        speedY: Math.random() * 0.6 + 0.3, // slow downward descent
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDistance: Math.random() * 20 + 10,
        oscillationTime: Math.random() * 100,
        color: leafColors[Math.floor(Math.random() * leafColors.length)]
      });
    }

    // Gentle wind gusts
    let windTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      windTime += 0.01;
      const currentBreeze = Math.sin(windTime) * 0.4 + 0.6; // soft fluctuating breeze

      // Draw subtle wind flow lines in the background
      ctx.strokeStyle = 'rgba(215, 205, 190, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let w = 0; w < 3; w++) {
        const yBase = (height / 4) * (w + 1) + Math.sin(windTime + w) * 15;
        ctx.moveTo(0, yBase);
        ctx.bezierCurveTo(
          width * 0.3,
          yBase - 20,
          width * 0.7,
          yBase + 20,
          width,
          yBase
        );
      }
      ctx.stroke();

      // Draw & update each leaf
      leaves.forEach((leaf) => {
        leaf.oscillationTime += leaf.oscillationSpeed;
        const sway = Math.sin(leaf.oscillationTime) * 0.6;

        leaf.x += (leaf.speedX + sway) * currentBreeze;
        leaf.y += leaf.speedY;
        leaf.angle += leaf.angularSpeed;

        // Reset if offscreen (right or bottom)
        if (leaf.x > width + 30) {
          leaf.x = -20;
          leaf.y = Math.random() * height;
        }
        if (leaf.y > height + 30) {
          leaf.y = -20;
          leaf.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);

        // Draw organic stylized leaf / petal shape
        ctx.fillStyle = leaf.color;
        ctx.beginPath();
        // Leaf shape with gentle curve
        ctx.moveTo(0, -leaf.size);
        ctx.bezierCurveTo(leaf.size * 0.7, -leaf.size * 0.5, leaf.size * 0.7, leaf.size * 0.5, 0, leaf.size);
        ctx.bezierCurveTo(-leaf.size * 0.7, leaf.size * 0.5, -leaf.size * 0.7, -leaf.size * 0.5, 0, -leaf.size);
        ctx.fill();

        // Subtle leaf vein
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -leaf.size * 0.8);
        ctx.lineTo(0, leaf.size * 0.8);
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
