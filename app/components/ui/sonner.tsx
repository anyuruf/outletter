import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { CSSProperties, ReactNode } from "react";

import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useTheme } from "remix-themes";

/**** Copied from private ToastIcons interface from node_modules in sonner package *****/
interface ToastIcons {
  success?: ReactNode
  info?: ReactNode
  warning?: ReactNode
  error?: ReactNode
  loading?: ReactNode
  close?: ReactNode
}

const Toaster = ({
  ...props
}) => {
  const [theme, ] = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" /> ,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      } as ToastIcons }
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        }as CSSProperties
      }
      {...props} />
  );
}

export { Toaster }
