import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  fullWidth?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fullWidth = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto px-3 sm:px-4 lg:px-6",
          fullWidth ? "w-full min-w-[320px] xs:min-w-[375px] sm:min-w-[640px] md:min-w-[768px] lg:min-w-[900px] xl:min-w-[1000px]" : "max-w-7xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = "Container"

export { Container }
