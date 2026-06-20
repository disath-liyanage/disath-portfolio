import { useEffect, useRef } from 'react';
import './LiquidGlassBtn.css';

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
  uniform vec4 iMouse;
  uniform sampler2D iChannel0;

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    const float NUM_ZERO        = 0.0;
    const float NUM_ONE         = 1.0;
    const float NUM_HALF        = 0.5;
    const float NUM_TWO         = 2.0;
    const float POWER_EXPONENT  = 6.0;
    const float MASK_MULT_1     = 10000.0;
    const float MASK_MULT_2     = 9500.0;
    const float MASK_MULT_3     = 11000.0;
    const float LENS_MULT       = 5000.0;
    const float MASK_STR_1      = 8.0;
    const float MASK_STR_2      = 16.0;
    const float MASK_STR_3      = 2.0;
    const float MASK_THRESH_1   = 0.95;
    const float MASK_THRESH_2   = 0.9;
    const float MASK_THRESH_3   = 1.5;
    const float SAMPLE_RANGE    = 4.0;
    const float SAMPLE_OFFSET   = 0.5;
    const float GRAD_RANGE      = 0.2;
    const float GRAD_OFFSET     = 0.1;
    const float GRAD_EXTREME    = -1000.0;
    const float LIGHT_INTENSITY = 0.3;

    vec2 uv    = fragCoord / iResolution.xy;
    vec2 mouse = iMouse.xy;
    if (length(mouse) < NUM_ONE) {
      mouse = iResolution.xy / NUM_TWO;
    }
    vec2 m2 = uv - mouse / iResolution.xy;

    float ar          = iResolution.x / iResolution.y;
    float roundedBox  = pow(abs(m2.x * ar), POWER_EXPONENT)
                      + pow(abs(m2.y),       POWER_EXPONENT);

    float rb1 = clamp((NUM_ONE     - roundedBox * MASK_MULT_1) * MASK_STR_1, NUM_ZERO, NUM_ONE);
    float rb2 = clamp((MASK_THRESH_1 - roundedBox * MASK_MULT_2) * MASK_STR_2, NUM_ZERO, NUM_ONE)
              - clamp(pow(MASK_THRESH_2 - roundedBox * MASK_MULT_2, NUM_ONE) * MASK_STR_2, NUM_ZERO, NUM_ONE);
    float rb3 = clamp((MASK_THRESH_3 - roundedBox * MASK_MULT_3) * MASK_STR_3, NUM_ZERO, NUM_ONE)
              - clamp(pow(NUM_ONE      - roundedBox * MASK_MULT_3, NUM_ONE) * MASK_STR_3, NUM_ZERO, NUM_ONE);

    fragColor = vec4(NUM_ZERO);
    float transition = smoothstep(NUM_ZERO, NUM_ONE, rb1 + rb2);

    if (transition > NUM_ZERO) {
      vec2  lens  = (uv - NUM_HALF) * (NUM_ONE - roundedBox * LENS_MULT) + NUM_HALF;
      float total = NUM_ZERO;
      for (float x = -SAMPLE_RANGE; x <= SAMPLE_RANGE; x++) {
        for (float y = -SAMPLE_RANGE; y <= SAMPLE_RANGE; y++) {
          vec2 off = vec2(x, y) * SAMPLE_OFFSET / iResolution.xy;
          fragColor += texture2D(iChannel0, off + lens);
          total += NUM_ONE;
        }
      }
      fragColor /= total;

      float gradient =
          clamp((clamp( m2.y, NUM_ZERO, GRAD_RANGE)             + GRAD_OFFSET) / NUM_TWO, NUM_ZERO, NUM_ONE)
        + clamp((clamp(-m2.y, GRAD_EXTREME, GRAD_RANGE) * rb3   + GRAD_OFFSET) / NUM_TWO, NUM_ZERO, NUM_ONE);

      vec4 lighting = clamp(
        fragColor + vec4(rb1) * gradient + vec4(rb2) * LIGHT_INTENSITY,
        NUM_ZERO, NUM_ONE
      );
      fragColor = mix(texture2D(iChannel0, uv), lighting, transition);
    } else {
      fragColor = texture2D(iChannel0, uv);
    }
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

function buildBgTexture(size) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');

  const r1 = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size);
  r1.addColorStop(0.0, '#3c3a5f');
  r1.addColorStop(0.5, '#1c1a38');
  r1.addColorStop(1.0, '#09090f');
  ctx.fillStyle = r1;
  ctx.fillRect(0, 0, size, size);

  const r2 = ctx.createLinearGradient(0, 0, size, size);
  r2.addColorStop(0.0, 'rgba(130, 80, 240, 0.45)');
  r2.addColorStop(0.5, 'rgba(60, 110, 210, 0.3)');
  r2.addColorStop(1.0, 'rgba(100, 50, 200, 0.45)');
  ctx.fillStyle = r2;
  ctx.fillRect(0, 0, size, size);

  const r3 = ctx.createRadialGradient(size * 0.3, size * 0.25, 0, size * 0.3, size * 0.25, size * 0.5);
  r3.addColorStop(0.0, 'rgba(255,255,255,0.18)');
  r3.addColorStop(1.0, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = r3;
  ctx.fillRect(0, 0, size, size);

  return c;
}

export default function LiquidGlassBtn({ direction, onClick, disabled }) {
  const canvasRef  = useRef(null);
  const mouseRef   = useRef([0, 0]);
  const rafRef     = useRef(null);
  const startRef   = useRef(performance.now());
  const glRef      = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const SIZE = 60;
    canvas.width  = SIZE;
    canvas.height = SIZE;

    const gl = canvas.getContext('webgl', { premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error('[LiquidGlassBtn] shader error:', gl.getShaderInfoLog(s));
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
      time       : gl.getUniformLocation(prog, 'iTime'),
      mouse      : gl.getUniformLocation(prog, 'iMouse'),
      texture    : gl.getUniformLocation(prog, 'iChannel0'),
    };

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, buildBgTexture(SIZE));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    glRef.current = { gl, uniforms, tex, SIZE };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = [
        e.clientX - rect.left,
        rect.height - (e.clientY - rect.top),
      ];
    };
    window.addEventListener('mousemove', onMouseMove);

    const loop = () => {
      const { gl: g, uniforms: u, tex: t, SIZE: S } = glRef.current;
      const elapsed = (performance.now() - startRef.current) / 1000;

      g.viewport(0, 0, S, S);
      g.clear(g.COLOR_BUFFER_BIT);
      g.uniform3f(u.resolution, S, S, 1.0);
      g.uniform1f(u.time, elapsed);
      g.uniform4f(u.mouse, mouseRef.current[0], mouseRef.current[1], 0, 0);
      g.activeTexture(g.TEXTURE0);
      g.bindTexture(g.TEXTURE_2D, t);
      g.uniform1i(u.texture, 0);
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <button
      className={`lglass-btn${disabled ? ' lglass-btn--off' : ''}`}
      onClick={!disabled ? onClick : undefined}
      aria-label={direction === 'prev' ? 'Previous projects' : 'Next projects'}
      type="button"
    >
      <canvas ref={canvasRef} className="lglass-btn__canvas" aria-hidden="true" />
      <span className="lglass-btn__arrow" aria-hidden="true">
        {direction === 'prev' ? '‹' : '›'}
      </span>
    </button>
  );
}
