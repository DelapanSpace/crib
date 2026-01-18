"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

export const ServiceNode = memo(
  ({ data, isConnectable, selected }: NodeProps) => {
    const isOpen = data.isOpen;
    const isSource = data.type === "source";

    return (
      <div className="relative group">
        {/* Glow Effect Background */}
        <div
          className={cn(
            "absolute -inset-0.5 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-700 opacity-0 transition duration-500 group-hover:opacity-50 blur",
            isOpen && "from-white/20 to-zinc-500/20 opacity-30",
            selected && "from-white/40 to-white/10 opacity-60",
          )}
        />

        <Card
          className={cn(
            "relative w-[340px] transition-all duration-500 border bg-zinc-950",
            // Default State
            "border-zinc-800 text-zinc-400",
            // Selected / Active State
            selected ? "border-zinc-500 ring-1 ring-zinc-500" : "",
            // Connected State (Override)
            isOpen
              ? "border-zinc-600 text-zinc-100 shadow-2xl shadow-black/50"
              : "h-[70px]",
            // Source Node Special Styling
            isSource && "border-white/20 bg-zinc-900",
          )}
        >
          <CardHeader className="p-5 flex flex-row items-center justify-between space-y-0 pb-0">
            <div className="flex items-center gap-3">
              {/* Status Indicator Dot */}
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-500",
                  isSource
                    ? "bg-white animate-pulse"
                    : isOpen
                      ? "bg-white shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      : "bg-zinc-800",
                )}
              />

              <span
                className={cn(
                  "text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300",
                  isOpen || isSource ? "text-white" : "text-zinc-500",
                )}
              >
                {data.label}
              </span>
            </div>

            {/* Tech Icon / Visual Fluff */}
            {isOpen && (
              <Activity className="w-4 h-4 text-zinc-600 animate-pulse" />
            )}
          </CardHeader>

          {/* Unfolding Content with Smooth Transition */}
          <div
            className={cn(
              "grid transition-all duration-500 ease-in-out",
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <CardContent className="p-5 pt-2">
                <div className="w-full h-[1px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 mb-4" />
                <p className="text-xs text-zinc-400 leading-relaxed font-light tracking-wide">
                  {data.description}
                </p>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Handles - Styled as tech ports */}
        {!isSource && (
          <Handle
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
            className="!w-2 !h-8 !rounded-[2px] !bg-zinc-800 !border-zinc-950 transition-colors group-hover:!bg-zinc-600 !-left-1"
          />
        )}

        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          className={cn(
            "!w-2 !h-8 !rounded-[2px] !border-zinc-950 !-right-1 transition-all duration-300",
            isSource ? "!bg-white" : "!bg-zinc-800 group-hover:!bg-zinc-600",
          )}
        />
      </div>
    );
  },
);

ServiceNode.displayName = "ServiceNode";
