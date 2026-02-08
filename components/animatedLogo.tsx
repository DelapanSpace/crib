"use client";
import { Disk } from "./logo";

export default function AnimatedLogo() {
  // Disk 1 data
  const disk1 = {
    transform: "matrix(0.962845,-0.055838,0.036491,0.629237,416.053173,1027.300675)",
    ellipseGroups: [
      { transform: "matrix(0.832623,0.196562,-0.066478,0.281595,739.954572,591.11955)", hasFill: true },
      { transform: "matrix(0.737394,0.174081,-0.045986,0.194795,799.120152,700.155132)", hasFill: false },
      { transform: "matrix(0.685975,0.161942,-0.036551,0.154829,832.463589,754.922222)", hasFill: true },
    ],
  };

  // Disk 2 data
  const disk2 = {
    transform: "matrix(0.99839,-0.056718,0.043228,0.76093,222.107522,459.596015)",
    ellipseGroups: [
      { transform: "matrix(0.832623,0.196562,-0.066478,0.281595,739.954572,591.11955)", hasFill: true },
      { transform: "matrix(0.737394,0.174081,-0.045986,0.194795,799.120152,700.155132)", hasFill: false },
      { transform: "matrix(0.685975,0.161942,-0.036551,0.154829,832.463589,754.922222)", hasFill: true },
    ],
  };

  // Disk 3 data
  const disk3 = {
    transform: "matrix(0.973468,-0.228823,0.156559,0.666041,146.775518,1238.703537)",
    ellipseGroups: [
      { transform: "matrix(0.832623,0.196562,-0.066478,0.281595,853.954572,318.11955)", hasFill: true },
      { transform: "matrix(0.737394,0.174081,-0.045986,0.194795,913.120152,427.155132)", hasFill: false },
      { transform: "matrix(0.685975,0.161942,-0.036551,0.154829,946.463589,481.922222)", hasFill: true },
    ],
  };

  return (
    <div className="relative w-full h-full pointer-events-auto">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1148 1155"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        overflow="visible"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: 2,
        }}
      >
        <g transform="matrix(1,0,0,1,-1438.801152,-477.98737)">
          <g transform="matrix(1,0,0,1.816847,288,-1480.551116)">
            <Disk diskIndex={0} transform={disk1.transform} ellipseGroups={disk1.ellipseGroups} />
            <Disk diskIndex={1} transform={disk2.transform} ellipseGroups={disk2.ellipseGroups} />
            <Disk diskIndex={2} transform={disk3.transform} ellipseGroups={disk3.ellipseGroups} />
          </g>
        </g>
      </svg>
    </div>
  );
}