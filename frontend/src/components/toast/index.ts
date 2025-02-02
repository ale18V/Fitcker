import ToastContext, { ToastConfigParams, ToastType } from "react-native-toast-message"
import { ToastProps, ToastPropsBase } from "./Toast"

export type ToastProviderOptions = ToastPropsBase

const getToastParams = (
  params: ToastProviderOptions,
  toastType: ToastType,
  options?: ToastConfigParams<undefined>
): Partial<ToastProps> => {
  return {
    props: params,
    type: toastType,
    ...options
  }
}

const Toast = {
  success: (options: ToastProviderOptions): void => {
    ToastContext.show(getToastParams(options, "success"))
  },
  info: (options: ToastProviderOptions): void => {
    ToastContext.show(getToastParams(options, "info"))
  },
  error: (options: ToastProviderOptions): void => {
    ToastContext.show(getToastParams(options, "error"))
  },
  hide: ToastContext.hide
}

export default Toast
