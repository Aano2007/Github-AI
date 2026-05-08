'use client';
import { forwardRef } from 'react';

interface TimelineCardProps {
  step: string;
  title: string;
  description: string;
  position: 'left' | 'right';
  active?: boolean;
  imageSrc?: string;
  yPercent?: number;
}

const TimelineCard = forwardRef<HTMLDivElement, TimelineCardProps>(
  ({ step, title, description, position, active = false, imageSrc, yPercent = 0.3 }, ref) => {
    const isLeft = position === 'left';
    return (
      <div ref={ref}
        style={{
          position: 'absolute',
          top: `${yPercent * 100}%`,
          ...(isLeft ? { right: 'calc(50% + 40px)' } : { left: 'calc(50% + 40px)' }),
          width: 'clamp(220px, 28vw, 360px)',
          opacity: 0,
          transform: 'translateY(28px) scale(0.95)',
          pointerEvents: 'auto',
        }}
        className={`rounded-2xl p-5 flex flex-col gap-3 backdrop-blur-md bg-white/[0.04] border transition-colors duration-300 ${
          active
            ? 'border-green-500 shadow-[0_0_28px_2px_rgba(34,197,94,0.4),inset_0_0_20px_rgba(34,197,94,0.07)]'
            : 'border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
        }`}>
        {imageSrc && (
          <div className="relative rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt={title} className="w-full object-cover rounded-xl"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            <div className="absolute inset-0 bg-black/25 rounded-xl" />
          </div>
        )}
        <span className="text-xs font-mono text-green-400/80 tracking-widest uppercase">{step}</span>
        <h3 className="text-white font-bold text-base leading-snug">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        {active && (
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-green-400 text-xs font-mono">live</span>
          </div>
        )}
      </div>
    );
  }
);

TimelineCard.displayName = 'TimelineCard';
export default TimelineCard;
