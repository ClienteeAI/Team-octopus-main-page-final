import React from 'react';
import { motion } from 'motion/react';

interface FunnelStep {
  name: string;
  value: number; // 0-100
}

interface FunnelChartProps {
  steps: FunnelStep[];
  size?: number;
}

export default function FunnelChart({ steps, size = 300 }: FunnelChartProps) {
  const width = size;
  const height = size * 1.2;
  const stepHeight = height / steps.length;
  const maxWidth = width * 0.9;
  const minWidth = width * 0.2;

  return (
    <div className="relative flex flex-col items-center">
      <svg width={width} height={height} className="overflow-visible">
        {steps.map((step, i) => {
          const currentWidth = maxWidth - (i * (maxWidth - minWidth)) / steps.length;
          const nextWidth = maxWidth - ((i + 1) * (maxWidth - minWidth)) / steps.length;
          
          const x1 = (width - currentWidth) / 2;
          const x2 = (width + currentWidth) / 2;
          const x3 = (width + nextWidth) / 2;
          const x4 = (width - nextWidth) / 2;
          
          const y1 = i * stepHeight;
          const y2 = (i + 1) * stepHeight;

          const points = `${x1},${y1} ${x2},${y1} ${x3},${y2} ${x4},${y2}`;

          return (
            <g key={i} className="group">
              <motion.polygon
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                points={points}
                fill="#0F172A"
                fillOpacity={0.05 + (i * 0.05)}
                stroke="#D4AF37"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              <text
                x={width / 2}
                y={y1 + stepHeight / 2}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="text-[10px] font-bold uppercase tracking-widest fill-octopus-navy/60"
              >
                {step.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
