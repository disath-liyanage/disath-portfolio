import { useEffect, useRef } from 'react';
import './LiquidGlassBtn.css';

const PrevIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const NextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const VERT_SRC = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG_SRC = `
  precision mediump float;

  uniform vec3 iResolution;
  uniform float iTime;

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    vec2 m2 = uv - 0.5;

    // Perfect circle math
    float roundedBox = dot(m2, m2); 

    float rb1 = clamp((1.0 - roundedBox * 4.0) * 8.0, 0.0, 1.0);
    float rb2 = clamp((0.95 - roundedBox * 3.8) * 16.0, 0.0, 1.0) -
                clamp((0.9 - roundedBox * 3.8) * 16.0, 0.0, 1.0);
    float rb3 = clamp((1.5 - roundedBox * 4.4) * 2.0, 0.0, 1.0) -
                clamp((1.0 - roundedBox * 4.4) * 2.0, 0.0, 1.0);

    float transition = smoothstep(0.0, 1.0, rb1 + rb2);

    if (transition > 0.0) {
      float gradient = clamp((clamp(m2.y, 0.0, 0.2) + 0.1) / 2.0, 0.0, 1.0) +
                       clamp((clamp(-m2.y, -1.0, 0.2) * rb3 + 0.1) / 2.0, 0.0, 1.0);
      
      vec4 lighting = vec4(rb1) * gradient + vec4(rb2) * 0.3;
      fragColor = lighting; 
    } else {
      fragColor = vec4(0.0);
    }
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

export default function LiquidGlassBtn({ direction, onClick }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const startRef  = useRef(performance.now());
  const glRef     = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const SIZE = 60; 
    canvas.width  = SIZE;
    canvas.height = SIZE;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT_SRC));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1,  1, -1, -1,  1,  1,  1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution : gl.getUniformLocation(prog, 'iResolution'),
      time       : gl.getUniformLocation(prog, 'iTime')
    };

    glRef.current = { gl, uniforms, SIZE };

    const loop = () => {
      const { gl: g, uniforms: u, SIZE: S } = glRef.current;
      const elapsed = (performance.now() - startRef.current) / 1000;

      g.viewport(0, 0, S, S);
      g.clearColor(0.0, 0.0, 0.0, 0.0);
      g.clear(g.COLOR_BUFFER_BIT);
      
      g.uniform3f(u.resolution, S, S, 1.0);
      g.uniform1f(u.time, elapsed);
      
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <button
      className="lglass-btn"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous projects' : 'Next projects'}
      type="button"
    >
      <canvas ref={canvasRef} className="lglass-btn__canvas" aria-hidden="true" style={{ pointerEvents: 'none' }} />
      <span className="lglass-btn__arrow" aria-hidden="true" style={{ pointerEvents: 'none' }}>
        {direction === 'prev' ? <PrevIcon /> : <NextIcon />}
      </span>
    </button>
  );
}