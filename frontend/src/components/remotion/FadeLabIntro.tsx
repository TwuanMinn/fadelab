"use client";

import {
    AbsoluteFill,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
    Audio,
} from "remotion";

// ===== CINEMATIC BRAND INTRO - 5 SECONDS =====
// A sleek, must-watch intro that builds anticipation

// Animated particles/sparks effect
const Particles = () => {
    const frame = useCurrentFrame();
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        startX: Math.random() * 1920,
        startY: 1080 + Math.random() * 100,
        speed: 2 + Math.random() * 4,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 60,
        drift: (Math.random() - 0.5) * 100,
    }));

    return (
        <>
            {particles.map((p) => {
                const adjustedFrame = frame - p.delay;
                if (adjustedFrame < 0) return null;

                const y = p.startY - adjustedFrame * p.speed;
                const x = p.startX + Math.sin(adjustedFrame * 0.05) * p.drift;
                const opacity = interpolate(
                    adjustedFrame,
                    [0, 20, 100],
                    [0, 0.8, 0],
                    { extrapolateRight: "clamp" }
                );

                if (y < -50) return null;

                return (
                    <div
                        key={p.id}
                        style={{
                            position: "absolute",
                            left: x,
                            top: y,
                            width: p.size,
                            height: p.size,
                            borderRadius: "50%",
                            background: `radial-gradient(circle, rgba(17,82,212,${opacity}) 0%, rgba(59,130,246,${opacity * 0.5}) 100%)`,
                            boxShadow: `0 0 ${p.size * 3}px rgba(17,82,212,${opacity})`,
                        }}
                    />
                );
            })}
        </>
    );
};

// Razor blade sweep animation
const RazorSweep = ({ delay = 0 }: { delay: number }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame: frame - delay,
        fps,
        config: { damping: 20, stiffness: 80, mass: 0.5 },
    });

    const x = interpolate(progress, [0, 1], [-300, 2200]);
    const rotation = interpolate(progress, [0, 1], [-45, 15]);
    const opacity = interpolate(frame - delay, [0, 10, 50, 60], [0, 1, 1, 0], {
        extrapolateRight: "clamp",
    });

    return (
        <div
            style={{
                position: "absolute",
                top: "48%",
                left: x,
                transform: `rotate(${rotation}deg)`,
                opacity,
                zIndex: 5,
            }}
        >
            {/* Razor blade shape */}
            <div
                style={{
                    width: 200,
                    height: 4,
                    background: "linear-gradient(90deg, transparent 0%, #fff 20%, #3b82f6 50%, #fff 80%, transparent 100%)",
                    boxShadow: "0 0 30px rgba(59,130,246,0.8), 0 0 60px rgba(17,82,212,0.5)",
                }}
            />
            {/* Trail effect */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 400,
                    height: 4,
                    background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3))",
                    filter: "blur(8px)",
                }}
            />
        </div>
    );
};

// Main logo reveal with dramatic effect
const LogoReveal = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Staggered animations
    const iconScale = spring({
        frame: frame - 30,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const textReveal = spring({
        frame: frame - 45,
        fps,
        config: { damping: 15, stiffness: 80 },
    });

    const taglineOpacity = interpolate(frame, [70, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const glowPulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.6, 1]);

    // Icon entrance
    const iconY = interpolate(iconScale, [0, 1], [100, 0]);
    const iconOpacity = interpolate(iconScale, [0, 0.5, 1], [0, 1, 1]);

    // Text slide in
    const textX = interpolate(textReveal, [0, 1], [-100, 0]);
    const textOpacity = interpolate(textReveal, [0, 0.5, 1], [0, 1, 1]);

    // Letter spacing animation
    const letterSpacing = interpolate(textReveal, [0, 1], [30, -2]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 30,
                zIndex: 10,
            }}
        >
            {/* Scissors Icon */}
            <div
                style={{
                    transform: `translateY(${iconY}px) scale(${iconScale})`,
                    opacity: iconOpacity,
                }}
            >
                <div
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 24,
                        background: "linear-gradient(135deg, #1152d4 0%, #3b82f6 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 ${80 * glowPulse}px rgba(17,82,212,${0.7 * glowPulse}), 
                        0 0 ${40 * glowPulse}px rgba(59,130,246,${0.5 * glowPulse})`,
                    }}
                >
                    <span style={{ fontSize: 56, color: "white" }}>✂️</span>
                </div>
            </div>

            {/* Brand Name */}
            <div
                style={{
                    transform: `translateX(${textX}px)`,
                    opacity: textOpacity,
                }}
            >
                <h1
                    style={{
                        fontSize: 120,
                        fontWeight: 900,
                        letterSpacing,
                        color: "transparent",
                        background: "linear-gradient(180deg, #ffffff 0%, #a5b4fc 50%, #6366f1 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        textShadow: "0 0 100px rgba(99,102,241,0.5)",
                    }}
                >
                    FadeLab
                </h1>
            </div>

            {/* Tagline */}
            <div
                style={{
                    opacity: taglineOpacity,
                    transform: `translateY(${interpolate(taglineOpacity, [0, 1], [20, 0])}px)`,
                }}
            >
                <p
                    style={{
                        fontSize: 24,
                        fontWeight: 500,
                        letterSpacing: 8,
                        color: "rgba(255,255,255,0.7)",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                    }}
                >
                    Premium Grooming
                </p>
            </div>
        </div>
    );
};

// Cinematic bars (letterbox effect)
const CinematicBars = () => {
    const frame = useCurrentFrame();

    const barHeight = interpolate(frame, [0, 30], [150, 80], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    const exitProgress = interpolate(frame, [120, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const exitBarHeight = interpolate(exitProgress, [0, 1], [barHeight, 0]);

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: exitBarHeight,
                    background: "#000",
                    zIndex: 20,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: exitBarHeight,
                    background: "#000",
                    zIndex: 20,
                }}
            />
        </>
    );
};

// Vignette effect
const Vignette = () => {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
                zIndex: 3,
            }}
        />
    );
};

// Main Intro Composition
export const FadeLabIntro = () => {
    const frame = useCurrentFrame();

    // Background pulse
    const bgPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.3, 0.5]);

    return (
        <AbsoluteFill
            style={{
                background: `radial-gradient(ellipse at center, 
          rgba(17,30,60,${bgPulse}) 0%, 
          rgba(10,10,20,1) 50%, 
          rgba(0,0,0,1) 100%)`,
                overflow: "hidden",
            }}
        >
            {/* Animated background grid */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(17,82,212,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,82,212,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                    transform: `translateY(${frame * 0.5}px)`,
                    opacity: 0.5,
                }}
            />

            {/* Floating particles */}
            <Particles />

            {/* Vignette */}
            <Vignette />

            {/* Razor sweep effect */}
            <Sequence from={15} durationInFrames={70}>
                <RazorSweep delay={0} />
            </Sequence>

            {/* Center content */}
            <AbsoluteFill
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LogoReveal />
            </AbsoluteFill>

            {/* Cinematic letterbox bars */}
            <CinematicBars />

            {/* Final flash transition */}
            <Sequence from={140}>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "white",
                        opacity: interpolate(
                            useCurrentFrame(),
                            [0, 10],
                            [0, 1],
                            { extrapolateRight: "clamp" }
                        ),
                        zIndex: 50,
                    }}
                />
            </Sequence>
        </AbsoluteFill>
    );
};

// Video configuration - 5 seconds at 30fps = 150 frames
export const fadeLabIntroConfig = {
    id: "FadeLabIntro",
    component: FadeLabIntro,
    durationInFrames: 150, // 5 seconds
    fps: 30,
    width: 1920,
    height: 1080,
};
