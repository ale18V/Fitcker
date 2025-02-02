// components/Providers/ToastProvider.tsx
import React, { FC } from "react"
import ToastMessage, { ToastConfig } from "react-native-toast-message"
import Toast, { ToastProps } from "./Toast"

const toastConfig: ToastConfig = {
  success: (params: ToastProps) => {
    return <Toast {...params} />
  },
  error: (params: ToastProps) => {
    return <Toast {...params} />
  },
  info: (params: ToastProps) => {
    return <Toast {...params} />
  }
}

const Toaster: FC = () => {
  return (
    <ToastMessage config={toastConfig} />
  )
}

export default Toaster
