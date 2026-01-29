"use client";

import {
    AbsoluteFill,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
} from "remotion";

// Animated Text Component
const AnimatedText = ({
    text,
    delay = 0,
    style = {},
}: {
    text: string;
    delay?: number;
    style?: React.CSSProperties;
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const translateY = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const y = interpolate(translateY, [0, 1], [50, 0]);

    return (
        <div
            style={{
                opacity,
                transform: `translateY(${y}px)`,
                ...style,
            }}
        >
            {text}
        </div>
    );
};

// Scissors Animation
const AnimatedScissors = ({ delay = 0 }: { delay?: number }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - delay,
        fps,
        config: { damping: 10, stiffness: 80 },
    });

    const rotation = interpolate(frame - delay, [0, 30], [0, 360], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <div
            style={{
                fontSize: "120px",
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                opacity,
            }}
        >
            ✂️
        </div>
    );
};

// Glowing Orb Background
const GlowingOrbs = () => {
    const frame = useCurrentFrame();

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "10%",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(17,82,212,0.4) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    transform: `translate(${Math.sin(frame * 0.02) * 30}px, ${Math.cos(frame * 0.02) * 20}px)`,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "15%",
                    right: "15%",
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
                    filter: "blur(50px)",
                    transform: `translate(${Math.cos(frame * 0.025) * 25}px, ${Math.sin(frame * 0.025) * 25}px)`,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "30%",
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
                    filter: "blur(40px)",
                    transform: `translate(${Math.sin(frame * 0.03) * 20}px, ${Math.cos(frame * 0.03) * 30}px)`,
                }}
            />
        </>
    );
};

// Intro Scene
const IntroScene = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const logoScale = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 80 },
    });

    const glowPulse = interpolate(
        Math.sin(frame * 0.1),
        [-1, 1],
        [0.5, 1]
    );

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 30,
            }}
        >
            <GlowingOrbs />

            {/* Icon */}
            <div
                style={{
                    transform: `scale(${logoScale})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 120,
                    height: 120,
                    borderRadius: 24,
                    background: "linear-gradient(135deg, #1152d4 0%, #3b82f6 100%)",
                    boxShadow: `0 0 ${60 * glowPulse}px rgba(17,82,212,${0.6 * glowPulse})`,
                }}
            >
                <span style={{ fontSize: 60, color: "white" }}>✂️</span>
            </div>

            {/* Logo Text */}
            <AnimatedText
                text="FadeLab"
                delay={15}
                style={{
                    fontSize: 96,
                    fontWeight: 900,
                    letterSpacing: -4,
                    color: "white",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                }}
            />

            <AnimatedText
                text="Premium Grooming Experience"
                delay={30}
                style={{
                    fontSize: 28,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: 6,
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                }}
            />
        </AbsoluteFill>
    );
};

// Services Scene
const ServicesScene = () => {
    const services = [
        { icon: "✂️", name: "Precision Cuts", price: "$45" },
        { icon: "🧔", name: "Beard Grooming", price: "$35" },
        { icon: "💈", name: "Hot Towel Shave", price: "$50" },
        { icon: "✨", name: "Deluxe Package", price: "$85" },
    ];

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 60,
            }}
        >
            <GlowingOrbs />

            <AnimatedText
                text="Our Services"
                delay={0}
                style={{
                    fontSize: 64,
                    fontWeight: 800,
                    color: "white",
                    marginBottom: 60,
                    fontFamily: "'Inter', sans-serif",
                }}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 30,
                    width: "100%",
                    maxWidth: 900,
                }}
            >
                {services.map((service, i) => (
                    <ServiceCard key={service.name} {...service} delay={20 + i * 15} />
                ))}
            </div>
        </AbsoluteFill>
    );
};

const ServiceCard = ({
    icon,
    name,
    price,
    delay,
}: {
    icon: string;
    name: string;
    price: string;
    delay: number;
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <div
            style={{
                opacity,
                transform: `scale(${scale})`,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                padding: 30,
                display: "flex",
                alignItems: "center",
                gap: 20,
                backdropFilter: "blur(10px)",
            }}
        >
            <div
                style={{
                    fontSize: 48,
                    width: 80,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(17,82,212,0.2)",
                    borderRadius: 12,
                }}
            >
                {icon}
            </div>
            <div>
                <div
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "white",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    {name}
                </div>
                <div
                    style={{
                        fontSize: 32,
                        fontWeight: 800,
                        color: "#3b82f6",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    {price}
                </div>
            </div>
        </div>
    );
};

// Stats Scene
const StatsScene = () => {
    const stats = [
        { value: "6+", label: "Years Experience" },
        { value: "2500+", label: "Happy Clients" },
        { value: "4", label: "Expert Barbers" },
        { value: "15K+", label: "Haircuts Done" },
    ];

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%)",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 60,
            }}
        >
            <GlowingOrbs />

            <AnimatedText
                text="By The Numbers"
                delay={0}
                style={{
                    fontSize: 64,
                    fontWeight: 800,
                    color: "white",
                    marginBottom: 80,
                    fontFamily: "'Inter', sans-serif",
                }}
            />

            <div
                style={{
                    display: "flex",
                    gap: 60,
                    justifyContent: "center",
                }}
            >
                {stats.map((stat, i) => (
                    <StatItem key={stat.label} {...stat} delay={15 + i * 12} />
                ))}
            </div>
        </AbsoluteFill>
    );
};

const StatItem = ({
    value,
    label,
    delay,
}: {
    value: string;
    label: string;
    delay: number;
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - delay,
        fps,
        config: { damping: 15, stiffness: 120 },
    });

    const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <div
            style={{
                opacity,
                transform: `scale(${scale})`,
                textAlign: "center",
            }}
        >
            <div
                style={{
                    fontSize: 72,
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #1152d4 0%, #3b82f6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                {value}
            </div>
            <div
                style={{
                    fontSize: 18,
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    marginTop: 10,
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                {label}
            </div>
        </div>
    );
};

// CTA Scene
const CTAScene = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const buttonScale = spring({
        frame: frame - 30,
        fps,
        config: { damping: 10, stiffness: 80 },
    });

    const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.95, 1.05]);

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 40,
            }}
        >
            <GlowingOrbs />

            <AnimatedText
                text="Ready For Your"
                delay={0}
                style={{
                    fontSize: 48,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "'Inter', sans-serif",
                }}
            />

            <AnimatedText
                text="Best Look Yet?"
                delay={15}
                style={{
                    fontSize: 80,
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #ffffff 0%, #3b82f6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "'Inter', sans-serif",
                }}
            />

            <div
                style={{
                    transform: `scale(${buttonScale * pulse})`,
                    marginTop: 20,
                }}
            >
                <div
                    style={{
                        background: "linear-gradient(135deg, #1152d4 0%, #3b82f6 100%)",
                        padding: "24px 60px",
                        borderRadius: 16,
                        fontSize: 28,
                        fontWeight: 700,
                        color: "white",
                        boxShadow: "0 0 60px rgba(17,82,212,0.5)",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    Book Now →
                </div>
            </div>

            <AnimatedText
                text="Walk-ins Welcome • Manhattan, NY"
                delay={45}
                style={{
                    fontSize: 20,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: 2,
                    marginTop: 30,
                    fontFamily: "'Inter', sans-serif",
                }}
            />
        </AbsoluteFill>
    );
};

// Main Composition
export const FadeLabPromoVideo = () => {
    return (
        <>
            <Sequence from={0} durationInFrames={90}>
                <IntroScene />
            </Sequence>

            <Sequence from={90} durationInFrames={120}>
                <ServicesScene />
            </Sequence>

            <Sequence from={210} durationInFrames={100}>
                <StatsScene />
            </Sequence>

            <Sequence from={310} durationInFrames={90}>
                <CTAScene />
            </Sequence>
        </>
    );
};

// Video configuration export
export const fadeLabVideoConfig = {
    id: "FadeLabPromo",
    component: FadeLabPromoVideo,
    durationInFrames: 400,
    fps: 30,
    width: 1920,
    height: 1080,
};
