"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  type BarProps,
  type ChartConfig,
  ChartContainer,
  ChartTooltip as RechartsChartTooltip,
  ChartTooltipContent,
  Label,
  LabelList,
  Line,
  LineChart,
  type LineProps,
  Pie,
  PieChart,
  type PieProps,
  PolarGrid,
  Radar,
  RadarChart,
  type RadarProps,
  RadialBar,
  RadialBarChart,
  type RadialBarProps,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import type { AxisDomain, AxisInterval } from "recharts/types/util/types"

import { cn } from "@/lib/utils"

// Components
const ChartContext = React.createContext<ChartContextProps>({})

type ChartContextProps = {
  config?: ChartConfig
}

function Chart({ config, className, children }: ChartContextProps & React.ComponentPropsWithoutRef<"div">) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("h-96 w-full", className)}>{children}</div>
    </ChartContext.Provider>
  )
}

type ChartCrosshairProps = {
  x?: number
  y?: number
  orientation?: "horizontal" | "vertical" | "both"
  className?: string
}

function ChartCrosshair({ x, y, orientation = "both", className }: ChartCrosshairProps) {
  return (
    <>
      {orientation !== "vertical" && x && (
        <div className={cn("absolute inset-y-0 w-px bg-gray-300 dark:bg-gray-700", className)} style={{ left: x }} />
      )}
      {orientation !== "horizontal" && y && (
        <div className={cn("absolute inset-x-0 h-px bg-gray-300 dark:bg-gray-700", className)} style={{ top: y }} />
      )}
    </>
  )
}

type ChartLegendProps = React.ComponentPropsWithoutRef<"div"> & {
  content?: React.ComponentPropsWithoutRef<typeof ChartTooltipContent>["content"]
}

function ChartLegend({ className, content, ...props }: ChartLegendProps) {
  const { config } = React.useContext(ChartContext)

  if (!config) {
    return null
  }

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4", className)} {...props}>
      {content && content({ config })}
    </div>
  )
}

type ChartLegendContentProps = React.ComponentPropsWithoutRef<"div"> & {
  config?: ChartConfig
}

function ChartLegendContent({ config, className, ...props }: ChartLegendContentProps) {
  const { config: contextConfig } = React.useContext(ChartContext)
  const chartConfig = config || contextConfig

  if (!chartConfig) {
    return null
  }

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4", className)} {...props}>
      {Object.entries(chartConfig).map(([key, item]) => (
        <div key={key} className="flex items-center gap-1.5">
          <div
            className="h-3 w-3 shrink-0 rounded-full"
            style={{
              backgroundColor: `hsl(var(--chart-${item.color || "1"}))`,
            }}
          />
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

type ChartTooltipProps = React.ComponentPropsWithoutRef<typeof RechartsChartTooltip> & {
  content?: React.ComponentPropsWithoutRef<typeof ChartTooltipContent>["content"]
}

function CustomChartTooltip({ content, ...props }: ChartTooltipProps) {
  const { config } = React.useContext(ChartContext)

  if (!config) {
    return null
  }

  return (
    <RechartsChartTooltip
      cursor={false}
      content={({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return <ChartTooltipContent label={label} payload={payload} config={config} content={content} />
        }

        return null
      }}
      {...props}
    />
  )
}

// Re-export
export {
  Bar,
  BarChart,
  Chart,
  ChartContainer,
  ChartCrosshair,
  ChartLegend,
  ChartLegendContent,
  CustomChartTooltip as ChartTooltip,
  ChartTooltipContent,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
}
export type { BarProps, ChartConfig, LineProps, PieProps, RadarProps, RadialBarProps, AxisDomain, AxisInterval }
