"use client"

import * as React from "react"
import {
  ResizablePanelGroup as ResizablePanelGroupPrimitive,
  ResizablePanel as ResizablePanelPrimitive,
  ResizableHandle as ResizableHandlePrimitive,
} from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePanelGroupPrimitive>) => (
  <ResizablePanelGroupPrimitive
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
)

const ResizablePanel = ResizablePanelPrimitive

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof ResizableHandlePrimitive>,
  React.ComponentPropsWithoutRef<typeof ResizableHandlePrimitive>
>(({ className, withHandle, ...props }, ref) => (
  <ResizableHandlePrimitive
    ref={ref}
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-0 after:w-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[state=active]:bg-primary",
      withHandle &&
        "after:bg-background after:data-[panel-group-direction=vertical]:bg-background after:rounded-full after:data-[panel-group-direction=vertical]:rounded-full after:h-4 after:w-4 after:data-[panel-group-direction=vertical]:h-4 after:data-[panel-group-direction=vertical]:w-4 z-10 bg-border data-[panel-group-direction=vertical]:bg-border",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-4 items-center justify-center rounded-full border bg-background">
        {props.children}
      </div>
    )}
  </ResizableHandlePrimitive>
))
ResizableHandle.displayName = ResizableHandlePrimitive.displayName

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
