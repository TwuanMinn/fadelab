"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useState, useRef } from "react";

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
}

export default function QRCodeModal({ isOpen, onClose, url }: QRCodeModalProps) {
    const [copied, setCopied] = useState(false);
    const qrRef = useRef<HTMLDivElement>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadQRCode = () => {
        const svg = qrRef.current?.querySelector("svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "qrcode.png";
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-[400px] bg-slate-200/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/20 dark:border-slate-700/50 flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 size-10 rounded-full bg-white/50 dark:bg-slate-700/50 flex items-center justify-center hover:bg-white/80 dark:hover:bg-slate-600 transition-all group"
                    >
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 group-hover:rotate-90 transition-transform">close</span>
                    </button>

                    {/* QR Container */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-inner mb-6 mt-4 ring-8 ring-white/10" ref={qrRef}>
                        <QRCodeSVG
                            value={url}
                            size={240}
                            level="H"
                            includeMargin={false}
                            className="rounded-xl"
                        />
                    </div>

                    {/* URL Text */}
                    <p className="text-primary dark:text-secondary font-bold text-sm mb-8 tracking-wide hover:underline cursor-pointer" onClick={handleCopy}>
                        {url}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 w-full">
                        <button
                            onClick={handleCopy}
                            className="flex-1 flex items-center justify-center gap-2 bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-white font-black py-4 rounded-2xl transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl">share</span>
                            {copied ? "Copied" : "Share"}
                        </button>
                        <button
                            onClick={downloadQRCode}
                            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl">download</span>
                            Download QR
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
