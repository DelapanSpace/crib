"use client";

import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Edge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { ServiceNode } from "./service-node";
import Link from "next/link";

// Register custom node types
const nodeTypes = {
  serviceNode: ServiceNode,
};

// --- DATA CONFIGURATION ---
// 1. Define the Raw Data
const RAW_NODES = [
  {
    label: "Strategy",
    type: "source",
    description:
      "We develop business and brand strategies for enterprises, high-growth companies, and agency partners. Our strategic framework aligns vision, market positioning, and execution—ensuring every digital, creative, and marketing initiative delivers measurable business impact.",
  },
  {
    label: "UI/UX Design",
    type: "target",
    description:
      "Enterprise-grade UI/UX design focused on usability, conversion optimization, and brand consistency. We support businesses and agencies with user-centered digital experiences that enhance engagement, retention, and long-term platform performance.",
  },
  {
    label: "Web Development",
    type: "target",
    description:
      "Scalable web development services for enterprises and agency partners. We build high-performance, secure, and maintainable websites and platforms designed to support business growth, operational efficiency, and long-term digital scalability.",
  },
  {
    label: "Social Media Management",
    type: "target",
    description:
      "Strategic social media management for brands, enterprises, and whitelabel agency clients. We ensure consistent brand messaging, audience alignment, and performance-driven content across platforms to strengthen digital presence and credibility.",
  },
  {
    label: "Digital Marketing",
    type: "target",
    description:
      "Data-driven digital marketing solutions for businesses and agencies seeking sustainable growth. From paid campaigns to performance optimization, every initiative is aligned with strategic goals, audience targeting, and measurable ROI.",
  },
  {
    label: "Brand Design",
    type: "target",
    description:
      "Professional brand design services that translate strategy into visual identity systems. We help enterprises and agency partners create cohesive branding—logos, guidelines, and assets—that communicate authority, trust, and market differentiation.",
  },
  {
    label: "Product Photography",
    type: "target",
    description:
      "High-end product photography enhanced with AI-driven image optimization. Designed for brands, enterprises, and agencies requiring consistent, premium visuals that elevate product perception, campaign performance, and commercial value.",
  },
  {
    label: "KOL Management",
    type: "target",
    description:
      "Strategic KOL and influencer management for brands and agency partners. We identify, manage, and optimize collaborations with relevant creators to ensure authentic engagement, brand alignment, and campaign effectiveness.",
  },
  {
    label: "360 Campaign",
    type: "target",
    description:
      "Integrated 360-degree marketing campaigns delivering end-to-end execution. We align strategy, creative, digital, and media across channels to support enterprises and agencies in achieving cohesive, scalable, and high-impact campaigns.",
  },
  {
    label: "Brand Strategies",
    type: "target",
    description:
      "Comprehensive brand strategy services for enterprises, growing businesses, and agency partners. We define positioning, messaging architecture, and market direction to ensure long-term brand consistency, relevance, and competitive advantage.",
  },
];

// 2. Helper to Generate Initial Node Positions
// We place the Source in the center (x:0, y:0) and circle the rest around it.
const INITIAL_NODES = RAW_NODES.map((item, index) => {
  const isSource = item.type === "source";

  // Layout Logic:
  // Source at 0,0.
  // Others distributed in a grid or circle. Let's do a 2-column layout for neatness.
  // Or a random scatter for "discovery". Let's do a clean grid offset.

  let x = 0;
  let y = 0;

  if (isSource) {
    x = 100;
    y = 300; // Center-ish vertically
  } else {
    // Distribute targets in 3 columns to the right
    const colIndex = (index - 1) % 3; // 0, 1, 2
    const rowIndex = Math.floor((index - 1) / 3); // 0, 1, 2...

    x = 600 + colIndex * 400; // Start at 600px x, spacing 400px
    y = 50 + rowIndex * 200; // Start at 50px y, spacing 200px
  }

  return {
    id: index.toString(), // Simple string IDs: "0", "1", "2"...
    type: "serviceNode",
    position: { x, y },
    data: {
      label: item.label,
      type: item.type, // 'source' or 'target'
      description: item.description,
      isOpen: isSource, // Source starts open
    },
  };
});

export function ServiceFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 1. CONNECT Logic
  const onConnect = useCallback(
    (params: Connection) => {
      // Prevent connecting target to target (optional, but good for logic)
      // Since we only have one source "0", we can technically allow any connection
      // but let's stick to "Source" -> "Target" visual flow.

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            // FUTURE RETRO LINE STYLING
            type: "smoothstep", // Geometric lines
            pathOptions: { borderRadius: 20 }, // Rounded corners on the step
            animated: true,
            style: { stroke: "#fff", strokeWidth: 1.5, strokeDasharray: "5,5" }, // Dotted initial, or solid? Let's go Solid.
            // Let's actually make it Solid white for "retro" feel.
            // style: { stroke: '#ffffff', strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // 2. DISCONNECT Logic (Click edge to remove)
  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.stopPropagation(); // Stop clicking through to canvas
      setEdges((edges) => edges.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  // 3. UNFOLD Logic (Reactive State)
  useEffect(() => {
    // The "Source" node ID is "0" because it's first in the array.
    const SOURCE_ID = "0";

    setNodes((nds) =>
      nds.map((node) => {
        // Source always stays open
        if (node.id === SOURCE_ID) return node;

        // Check if this node is connected to the source
        // We look for an edge where (source="0" AND target=thisNode)
        const isConnected = edges.some(
          (edge) => edge.source === SOURCE_ID && edge.target === node.id
        );

        // Only update state if it changed
        if (node.data.isOpen !== isConnected) {
          return {
            ...node,
            data: { ...node.data, isOpen: isConnected },
          };
        }
        return node;
      })
    );
  }, [edges, setNodes]);

  return (
    <div className="w-full h-screen bg-black relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick} // Enables disconnect
        nodeTypes={nodeTypes}
        fitView
        className="bg-black"
        // Retro styling for the connection lines default
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "#52525b", strokeWidth: 2 }, // zinc-600 default
        }}
        minZoom={0.4}
        maxZoom={1.5}
      >
        <Background color="#ffffff63" gap={40} size={1} /> {/* zinc-800 dots */}
        {/* Title Overlay */}
        <div className="absolute top-12 left-8 md:left-12 z-10 select-none">
          <Link href="/" className="inline-block pointer-events-auto">
            <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-2 hover:opacity-80 transition cursor-pointer">
              Delapan's Service <br /> Ecosystem
            </h1>
          </Link>
          <p className="text-zinc-500 text-sm md:text-base uppercase tracking-[0.2em] flex items-center gap-2">
            Connect with intention
          </p>
        </div>
      </ReactFlow>
    </div>
  );
}
