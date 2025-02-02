import { FC, ReactNode } from "react";
import { ToastConfigParams, ToastType } from "react-native-toast-message";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { cn } from "$/utils";

export type ToastPropsBase = {
  title?: string;
  description?: string;
  children?: ReactNode;
  childrenContainerStyle?: StyleProp<ViewStyle>;
};

const stylesByType: Record<
  ToastType,
  Record<"container" | "content", string>
> = {
  info: {
    container: "border-blue-500",
    content: "bg-blue-500/50",
  },
  success: {
    container: "border-green-500",
    content: "bg-green-500/50",
  },
  error: {
    container: "border-red-500",
    content: "bg-red-500/50",
  },
};
export type ToastProps = ToastConfigParams<ToastPropsBase>;

const Toast: FC<ToastProps> = ({
  props: { children, childrenContainerStyle, title, description },
  hide: _hide,
  type,
}) => {
  return (
    <View className="px-4 w-full">
      <View
        className={cn(
          "rounded-lg border flex-row gap-1 justify-between overflow-hidden",
          stylesByType[type]?.container
        )}
      >
        <View className={cn("flex-1 gap-1 p-4", stylesByType[type]?.content)}>
          {!!children && <View style={childrenContainerStyle}>{children}</View>}

          {title && <Text numberOfLines={3}>{title}</Text>}

          {description && <Text numberOfLines={3}>{description}</Text>}
        </View>

        {/* <TouchableOpacity
          onPress={() => hide()}
          hitSlop={16}
        >
          <CloseIcon
            stroke={undefined}
            fill={colors.greyDark}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Toast;
