import React, { useEffect, useRef } from 'react';
import womanArtImg from '../assets/woman_art_transparent.png';

export default function SilhouetteBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;
    let isMounted = true;

    const img = new Image();
    img.src = womanArtImg;

    img.onload = () => {
      if (!isMounted) return;

      const gl = canvas.getContext('webgl', {
        alpha: true,
        premultipliedAlpha: false,
        antialias: true
      });

      // If WebGL is not available, fallback to 2D canvas drawImage
      if (!gl) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        return;
      }

      // --- Vertex Shader: Smooth fluid organic wind wave for hair ---
      const vsSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        uniform float u_time;

        void main() {
          vec2 pos = a_position;
          float u = a_texCoord.x; // 0.0 (left) to 1.0 (right)
          float v = a_texCoord.y; // 0.0 (top) to 1.0 (bottom)

          // Hair region: u in [0.52, 0.96], v in [0.14, 0.70]
          if (u > 0.52 && v < 0.70) {
            float dx = clamp((u - 0.52) / 0.40, 0.0, 1.0);
            float dy = clamp((0.70 - v) / 0.52, 0.0, 1.0);
            float weight = pow(dx, 1.35) * pow(dy, 0.80);

            // Two-harmonic organic hair sway (gentle breeze flutter)
            float swayY = (sin(u_time * 2.5 + u * 16.0) * 0.026 + sin(u_time * 4.4 + u * 32.0) * 0.009) * weight;
            float swayX = cos(u_time * 2.0 + u * 12.0) * 0.007 * weight;

            pos.y += swayY;
            pos.x += swayX;
          }

          // Subtle overall breathing on the figure
          float bodyBreath = sin(u_time * 1.6) * 0.0012;
          pos.y += bodyBreath;

          gl_Position = vec4(pos, 0.0, 1.0);
          v_texCoord = a_texCoord;
        }
      `;

      // --- Fragment Shader: Clean alpha blended texture ---
      const fsSource = `
        precision mediump float;
        uniform sampler2D u_image;
        varying vec2 v_texCoord;

        void main() {
          vec4 color = texture2D(u_image, v_texCoord);
          gl_FragColor = color;
        }
      `;

      // Compile shader helper
      const createShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('Shader compile error:', gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
      const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vertexShader || !fragmentShader) return;

      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return;
      }

      gl.useProgram(program);

      // --- Build 40x25 High Resolution Vertex Mesh ---
      const gridX = 40;
      const gridY = 25;
      const vertices = [];
      const indices = [];

      for (let j = 0; j <= gridY; j++) {
        const v = j / gridY;
        const yPos = (1.0 - v) * 2.0 - 1.0;
        for (let i = 0; i <= gridX; i++) {
          const u = i / gridX;
          const xPos = u * 2.0 - 1.0;
          // Store [xPos, yPos, u, v]
          vertices.push(xPos, yPos, u, v);
        }
      }

      for (let j = 0; j < gridY; j++) {
        for (let i = 0; i < gridX; i++) {
          const p1 = j * (gridX + 1) + i;
          const p2 = p1 + 1;
          const p3 = (j + 1) * (gridX + 1) + i;
          const p4 = p3 + 1;
          indices.push(p1, p3, p2, p2, p3, p4);
        }
      }

      // Vertex Buffer
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

      // Index Buffer
      const indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

      const aPosition = gl.getAttribLocation(program, 'a_position');
      const aTexCoord = gl.getAttribLocation(program, 'a_texCoord');
      const uTime = gl.getUniformLocation(program, 'u_time');
      const uImage = gl.getUniformLocation(program, 'u_image');

      const stride = 4 * Float32Array.BYTES_PER_ELEMENT;
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, stride, 0);

      gl.enableVertexAttribArray(aTexCoord);
      gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);

      // Texture setup
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      // Enable blending for transparent background
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.viewport(0, 0, canvas.width, canvas.height);

      // Render Loop
      const startTime = performance.now();
      const render = () => {
        if (!isMounted) return;

        const currentTime = (performance.now() - startTime) * 0.001;
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        gl.uniform1f(uTime, currentTime);
        gl.uniform1i(uImage, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      isMounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 right-0 z-0 pointer-events-none select-none overflow-hidden flex items-end justify-end"
      style={{
        width: 'min(500px, 78vw)',
        maxWidth: '100vw',
      }}
    >
      <canvas
        ref={canvasRef}
        width={1376}
        height={768}
        className="w-full h-auto object-contain object-bottom opacity-90 transition-opacity duration-700"
        style={{
          filter: 'drop-shadow(0 4px 20px rgba(28, 25, 23, 0.06))',
        }}
      />
    </div>
  );
}
