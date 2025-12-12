// Generate particles ONCE when the file loads, not during render
const PARTICLES = [...Array(50)].map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 3}s`,
}));

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

            <div className="absolute inset-0">
                {PARTICLES.map((p, i) => (
                    <div
                        key={i}
                        className="absolute w-px h-px bg-cyan-400 rounded-full animate-flicker"
                        style={{
                            left: p.left,
                            top: p.top,
                            '--duration': p.duration,
                            animationDelay: p.delay,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
        </div>
    );
};

export default AnimatedBackground;
