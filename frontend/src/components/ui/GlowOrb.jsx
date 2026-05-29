export default function GlowOrb({ color = '#ff6b35', size = 400, x = '0%', y = '0%', opacity = 0.12, blur = 80 }) {
  return (
    <div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        opacity,
        filter: `blur(${blur}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
