"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface DiskProps {
  diskIndex: number;
  transform: string;
  ellipseGroups: Array<{
    transform: string;
    hasFill: boolean;
  }>;
}

export function Disk({ diskIndex, transform, ellipseGroups }: DiskProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Each disk has unique random float patterns
  const floatY =
    diskIndex === 0
      ? [0, -12, 0, -8, 0]
      : diskIndex === 1
        ? [0, -6, 0, -15, 0]
        : [0, -18, 0, -10, 0];

  const floatX =
    diskIndex === 0
      ? [0, 4, 0, -3, 0]
      : diskIndex === 1
        ? [0, -5, 0, 2, 0]
        : [0, 6, 0, -4, 0];

  const rotate =
    diskIndex === 0
      ? [0, 2, 0, -1, 0]
      : diskIndex === 1
        ? [0, -3, 0, 2, 0]
        : [0, 1, 0, -2, 0];

  return (
    <g transform={transform}>
      <motion.g
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: floatY,
          x: floatX,
          rotate: rotate,
          z: isHovered ? 30 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          y: {
            duration: 3.5 + diskIndex * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: diskIndex * 0.5,
          },
          x: {
            duration: 4.2 + diskIndex * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: diskIndex * 0.3,
          },
          rotate: {
            duration: 5 + diskIndex * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: diskIndex * 0.4,
          },
          scale: {
            duration: 0.4,
            ease: "easeOut",
          },
        }}
        style={{
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      >
        {ellipseGroups.map((group, idx) => (
          <g key={idx} transform={group.transform}>
            <ellipse
              cx="878.5"
              cy="1078.5"
              rx="612.5"
              ry="439.5"
              style={group.hasFill ? { fill: "white" } : undefined}
            />
          </g>
        ))}
      </motion.g>
    </g>
  );
}

export default function Logo() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1148 1155"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
    >
      <g transform="matrix(1,0,0,1,-1438.801152,-477.98737)">
        <g transform="matrix(1,0,0,1.816847,288,-1480.551116)">
          <g transform="matrix(0.962845,-0.055838,0.036491,0.629237,416.053173,1027.300675)">
            <g transform="matrix(0.832623,0.196562,-0.066478,0.281595,739.954572,591.11955)">
              <ellipse
                cx="878.5"
                cy="1078.5"
                rx="612.5"
                ry="439.5"
                style={{ fill: "white" }}
              />
            </g>
            <g transform="matrix(0.737394,0.174081,-0.045986,0.194795,799.120152,700.155132)">
              <ellipse cx="878.5" cy="1078.5" rx="612.5" ry="439.5" />
            </g>
            <g transform="matrix(0.685975,0.161942,-0.036551,0.154829,832.463589,754.922222)">
              <ellipse
                cx="878.5"
                cy="1078.5"
                rx="612.5"
                ry="439.5"
                style={{ fill: "white" }}
              />
            </g>
          </g>
          <g transform="matrix(0.99839,-0.056718,0.043228,0.76093,222.107522,459.596015)">
            <g transform="matrix(0.832623,0.196562,-0.066478,0.281595,739.954572,591.11955)">
              <ellipse
                cx="878.5"
                cy="1078.5"
                rx="612.5"
                ry="439.5"
                style={{ fill: "white" }}
              />
            </g>
            <g transform="matrix(0.737394,0.174081,-0.045986,0.194795,799.120152,700.155132)">
              <ellipse cx="878.5" cy="1078.5" rx="612.5" ry="439.5" />
            </g>
            <g transform="matrix(0.685975,0.161942,-0.036551,0.154829,832.463589,754.922222)">
              <ellipse
                cx="878.5"
                cy="1078.5"
                rx="612.5"
                ry="439.5"
                style={{ fill: "white" }}
              />
            </g>
          </g>
          <g transform="matrix(0.973468,-0.228823,0.156559,0.666041,146.775518,1238.703537)">
            <g transform="matrix(0.832623,0.196562,-0.066478,0.281595,853.954572,318.11955)">
              <ellipse
                cx="878.5"
                cy="1078.5"
                rx="612.5"
                ry="439.5"
                style={{ fill: "white" }}
              />
            </g>
            <g transform="matrix(0.737394,0.174081,-0.045986,0.194795,913.120152,427.155132)">
              <ellipse cx="878.5" cy="1078.5" rx="612.5" ry="439.5" />
            </g>
            <g transform="matrix(0.685975,0.161942,-0.036551,0.154829,946.463589,481.922222)">
              <ellipse
                cx="878.5"
                cy="1078.5"
                rx="612.5"
                ry="439.5"
                style={{ fill: "white" }}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
