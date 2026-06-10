// Hand-drawn-style celestial line art, inspired by the reference design.
// All strokes inherit currentColor so they can be tinted via text-* classes.

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/** Radiant sun with crescent moon inside — hero left. */
export function SunWithMoon({ className = '' }) {
  const rays = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 * Math.PI) / 180;
    const len = i % 2 === 0 ? 38 : 26;
    const wob = i % 3 === 0 ? 4 : 0;
    return (
      <path
        key={i}
        {...stroke}
        d={`M ${100 + Math.cos(a) * 52} ${100 + Math.sin(a) * 52}
            Q ${100 + Math.cos(a + 0.08) * (52 + len / 2 + wob)} ${100 + Math.sin(a + 0.08) * (52 + len / 2 + wob)}
              ${100 + Math.cos(a) * (52 + len)} ${100 + Math.sin(a) * (52 + len)}`}
      />
    );
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {rays}
      <circle cx="100" cy="100" r="50" {...stroke} />
      <circle cx="100" cy="100" r="44" {...stroke} strokeDasharray="2 4" />
      {/* crescent moon */}
      <path {...stroke} strokeWidth="1.4" d="M112 72a34 34 0 1 0 16 52 27 27 0 0 1-16-52Z" />
      <path {...stroke} d="M104 118l3 3M111 112l2 2" />
      {/* star */}
      <path {...stroke} d="M124 84l1.8 4.4 4.4 1.8-4.4 1.8-1.8 4.4-1.8-4.4-4.4-1.8 4.4-1.8 1.8-4.4Z" />
    </svg>
  );
}

/** Sun with a serene face — hero right. */
export function SunFace({ className = '' }) {
  const flames = Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 * Math.PI) / 180;
    const r1 = 58;
    const r2 = 86;
    return (
      <path
        key={i}
        {...stroke}
        d={`M ${110 + Math.cos(a - 0.12) * r1} ${110 + Math.sin(a - 0.12) * r1}
            Q ${110 + Math.cos(a + 0.18) * (r2 + 6)} ${110 + Math.sin(a + 0.18) * (r2 + 6)}
              ${110 + Math.cos(a + 0.25) * r1} ${110 + Math.sin(a + 0.25) * r1}`}
      />
    );
  });
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden="true">
      <circle cx="110" cy="110" r="96" {...stroke} strokeDasharray="1 6" />
      {flames}
      <circle cx="110" cy="110" r="58" {...stroke} />
      <circle cx="110" cy="110" r="52" {...stroke} />
      {/* face */}
      <path {...stroke} d="M88 102q6-8 14-2M118 100q8-6 14 2" />
      <path {...stroke} d="M86 99l10-3M124 96l10 3" />
      <path {...stroke} d="M108 104q-4 12 2 16 4 3 8 0" />
      <path {...stroke} d="M100 132q10 8 22 1" />
      <path {...stroke} d="M97 118a3 3 0 1 0 .1 0M124 118a3 3 0 1 0 .1 0" strokeDasharray="1 2" />
    </svg>
  );
}

/** Open palm with markings. */
export function PalmIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        return (
          <path
            key={i}
            {...stroke}
            d={`M ${60 + Math.cos(a) * 46} ${56 + Math.sin(a) * 46} L ${60 + Math.cos(a) * 54} ${56 + Math.sin(a) * 54}`}
          />
        );
      })}
      <path
        {...stroke}
        d="M44 100V62c0-3-1-22 2-26s6-1 6 3v18m0-21c0-4-1-9 3-10s5 4 5 8v22m8-22c0-4 0-8 4-8s4 5 4 9v22m0-15c0-4 1-7 4-7s4 3 4 7v24c0 16-8 26-19 26S44 110 44 100Z"
      />
      <path {...stroke} d="M52 74q8 8 18 6M52 84q9 6 18 2" />
      <path {...stroke} d="M62 64l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
    </svg>
  );
}

/** Zodiac wheel with sun face centre. */
export function ZodiacWheel({ className = '' }) {
  const glyphAngles = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180);
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <circle cx="80" cy="80" r="72" {...stroke} />
      <circle cx="80" cy="80" r="60" {...stroke} />
      <circle cx="80" cy="80" r="34" {...stroke} strokeDasharray="2 4" />
      {glyphAngles.map((a, i) => (
        <g key={i}>
          <path
            {...stroke}
            d={`M ${80 + Math.cos(a) * 60} ${80 + Math.sin(a) * 60} L ${80 + Math.cos(a) * 72} ${80 + Math.sin(a) * 72}`}
          />
          <circle cx={80 + Math.cos(a + 0.26) * 66} cy={80 + Math.sin(a + 0.26) * 66} r="1.3" fill="currentColor" stroke="none" />
        </g>
      ))}
      {/* small sun face centre */}
      <circle cx="80" cy="80" r="22" {...stroke} />
      <path {...stroke} d="M72 76q3-3 6 0M82 76q3-3 6 0M74 88q6 5 12 0" />
    </svg>
  );
}

/** Heart-shaped lock and key — compatibility. */
export function LockAndKey({ className = '' }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      {/* heart lock */}
      <path
        {...stroke}
        d="M70 122C46 104 32 90 32 72c0-12 9-20 19-20 8 0 15 5 19 11 4-6 11-11 19-11 10 0 19 8 19 20 0 18-14 32-38 50Z"
      />
      <circle cx="70" cy="82" r="7" {...stroke} />
      <path {...stroke} d="M70 89v12" />
      {/* key */}
      <circle cx="36" cy="26" r="9" {...stroke} />
      <circle cx="36" cy="26" r="4" {...stroke} />
      <path {...stroke} d="M43 32l22 22m-8-2l-4 4m10-10l-4 4" />
      {/* ribbon sparkle */}
      <path {...stroke} d="M104 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
    </svg>
  );
}

/** Crescent moon with stars — tarot/biorhythm. */
export function MoonAndStars({ className = '' }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      <path {...stroke} strokeWidth="1.3" d="M84 22a52 52 0 1 0 26 78A44 44 0 0 1 84 22Z" />
      <circle cx="70" cy="70" r="62" {...stroke} strokeDasharray="1 6" />
      <path {...stroke} d="M96 44l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4 2.4-6Z" />
      <path {...stroke} d="M108 78l1.5 3.8 3.8 1.5-3.8 1.5-1.5 3.8-1.5-3.8-3.8-1.5 3.8-1.5 1.5-3.8Z" />
      <circle cx="52" cy="40" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="100" cy="106" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Scattered sparkles, used as decorative background. */
export function Sparkles({ className = '' }) {
  const pts = [
    [20, 30, 5], [70, 12, 3], [130, 40, 4], [180, 18, 6], [240, 50, 3],
    [40, 90, 3], [110, 80, 5], [200, 95, 4], [270, 75, 5], [300, 30, 3],
  ];
  return (
    <svg viewBox="0 0 320 120" className={className} aria-hidden="true">
      {pts.map(([x, y, s], i) => (
        <path
          key={i}
          {...stroke}
          d={`M ${x} ${y - s} L ${x + s * 0.35} ${y - s * 0.35} L ${x + s} ${y} L ${x + s * 0.35} ${y + s * 0.35} L ${x} ${y + s} L ${x - s * 0.35} ${y + s * 0.35} L ${x - s} ${y} L ${x - s * 0.35} ${y - s * 0.35} Z`}
        />
      ))}
    </svg>
  );
}

/** All-seeing eye — psychic reading. */
export function PsychicEye({ className = '' }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <path
            key={i}
            {...stroke}
            d={`M ${70 + Math.cos(a) * 50} ${70 + Math.sin(a) * 50} L ${70 + Math.cos(a) * 60} ${70 + Math.sin(a) * 60}`}
          />
        );
      })}
      <path {...stroke} strokeWidth="1.3" d="M26 70q44-40 88 0-44 40-88 0Z" />
      <circle cx="70" cy="70" r="16" {...stroke} />
      <circle cx="70" cy="70" r="7" {...stroke} />
      <circle cx="74" cy="66" r="1.5" fill="currentColor" stroke="none" />
      <path {...stroke} d="M70 28l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
    </svg>
  );
}

/** Serene face with moon and stars — face reading. */
export function FaceReading({ className = '' }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      <circle cx="70" cy="70" r="58" {...stroke} strokeDasharray="1 6" />
      <ellipse cx="70" cy="72" rx="32" ry="40" {...stroke} />
      <path {...stroke} d="M54 64q5-5 11-1M75 63q6-4 11 1" />
      <path {...stroke} d="M53 60l11-3M76 57l11 3" />
      <path {...stroke} d="M68 66q-3 10 2 13 3 2 6 0" />
      <path {...stroke} d="M60 92q10 7 20 0" />
      <path {...stroke} d="M38 76q-4 14 6 24M102 76q4 14-6 24" />
      <path {...stroke} d="M104 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
      <path {...stroke} d="M34 28a10 10 0 1 0 8 14 8 8 0 0 1-8-14Z" />
    </svg>
  );
}

const icons = {
  palm: PalmIcon,
  zodiac: ZodiacWheel,
  lock: LockAndKey,
  moon: MoonAndStars,
  eye: PsychicEye,
  face: FaceReading,
};

/** Resolve an icon component by key stored in service data. */
export function ServiceIcon({ icon, className }) {
  const Cmp = icons[icon] || MoonAndStars;
  return <Cmp className={className} />;
}
