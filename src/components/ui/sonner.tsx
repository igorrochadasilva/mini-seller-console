import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        className: "bg-gray-900/95 border border-gray-700 text-white shadow-2xl",
        style: {
          background: 'rgba(17, 24, 39, 0.95)',
          border: '1px solid rgb(55, 65, 81)',
          color: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        },
      }}
      style={
        {
          "--normal-bg": "rgba(17, 24, 39, 0.95)",
          "--normal-text": "white",
          "--normal-border": "rgb(55, 65, 81)",
          "--success-bg": "rgba(22, 101, 52, 0.95)",
          "--success-text": "white",
          "--success-border": "rgb(34, 197, 94)",
          "--error-bg": "rgba(153, 27, 27, 0.95)",
          "--error-text": "white",
          "--error-border": "rgb(239, 68, 68)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
