"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useMemo } from "react";
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

const nodeTypes = {
  serviceNode: ServiceNode,
};

export type ServiceItem = {
  label: string;
  type: "source" | "target";
  description: string;
};

export type ServicePageData = {
  pageTitle: string;
  pageSubtitle: string;
  services: ServiceItem[];
};

type ServiceFlowProps = {
  data: ServicePageData;
};

export function ServiceFlow({ data }: ServiceFlowProps) {
  const services = data?.services || [];

  // 1. Memoize initial nodes so they don't change on every render
  const initialNodes = useMemo(() => {
    return services.map((item, index) => {
      const isSource = item.type === "source";
      let x = 0;
      let y = 0;

      if (isSource) {
        x = 100;
        y = 300;
      } else {
        const effectiveIndex = index > 0 ? index - 1 : 0;
        const colIndex = effectiveIndex % 3;
        const rowIndex = Math.floor(effectiveIndex / 3);
        x = 600 + colIndex * 400;
        y = 50 + rowIndex * 200;
      }

      return {
        id: index.toString(),
        type: "serviceNode",
        position: { x, y },
        data: {
          label: item.label,
          type: item.type,
          description: item.description,
          isOpen: isSource,
        },
      };
    });
  }, [services]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 2. Sync nodes ONLY when the Sanity data actually changes
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  // 3. Connect Logic
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            pathOptions: { borderRadius: 20 },
            animated: true,
            style: { stroke: "#fff", strokeWidth: 1.5, strokeDasharray: "5,5" },
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.stopPropagation();
      setEdges((edges) => edges.filter((e) => e.id !== edge.id));
    },
    [setEdges],
  );

  // 4. FIXED: Unfold/Expand Logic
  // We remove 'nodes' from the dependency array to stop the loop.
  // We use a functional update inside setNodes to access current node state.
  useEffect(() => {
    setNodes((nds) => {
      const sourceNode = nds.find((n) => n.data.type === "source");
      const SOURCE_ID = sourceNode?.id;

      if (!SOURCE_ID) return nds;

      return nds.map((node) => {
        if (node.id === SOURCE_ID) return node;

        const isConnected = edges.some(
          (edge) => edge.source === SOURCE_ID && edge.target === node.id,
        );

        // Only update if state actually changed to prevent unnecessary re-renders
        if (node.data.isOpen !== isConnected) {
          return {
            ...node,
            data: { ...node.data, isOpen: isConnected },
          };
        }
        return node;
      });
    });
  }, [edges, setNodes]); // Only re-run when edges change

  return (
    <div className="w-full h-screen bg-black relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-black"
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "#52525b", strokeWidth: 2 },
        }}
        minZoom={0.4}
        maxZoom={1.5}
      >
        <Background color="#ffffff63" gap={40} size={1} />

        <div className="absolute top-12 left-8 md:left-12 z-10 select-none pointer-events-none">
          <Link href="/" className="inline-block pointer-events-auto">
            <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-2 hover:opacity-80 transition cursor-pointer">
              {data?.pageTitle}
            </h1>
          </Link>
          <p className="text-zinc-500 text-sm md:text-base uppercase tracking-[0.2em] flex items-center gap-2">
            {data?.pageSubtitle}
          </p>
        </div>
      </ReactFlow>
    </div>
  );
}
