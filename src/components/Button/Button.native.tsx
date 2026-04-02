import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { rawTokens } from '../../theme/tokens.raw';
import { iconSizeMap } from './Button.config';
import { ButtonSize, ButtonVariant } from './types';
import { ButtonSpinner } from './ButtonSpinner';
import { withIconSize } from '../../utils';

type ButtonNativeProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    onLongPress?: () => void;
    delayLongPress?: number;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    isLoading?: boolean;
    fullWidth?: boolean;
    iconBefore?: React.ReactNode;
    iconAfter?: React.ReactNode;
    style?: object | object[];
    'aria-label'?: string;
    accessible?: boolean;
};

const staticStyles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        gap: rawTokens.spacing4,
    },
    sizeMedium: {
        paddingVertical: rawTokens.spacing12,
        paddingHorizontal: rawTokens.spacing12,
        borderRadius: rawTokens.radius8,
    },
    sizeSmall: {
        paddingVertical: rawTokens.spacing8,
        paddingHorizontal: rawTokens.spacing12,
        borderRadius: rawTokens.radius8,
    },
    iconOnlyMedium: {
        paddingVertical: rawTokens.spacing12,
        paddingHorizontal: rawTokens.spacing12,
    },
    iconOnlySmall: {
        paddingVertical: rawTokens.spacing4,
        paddingHorizontal: rawTokens.spacing4,
    },
    fullWidth: {
        width: '100%',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontFamily: rawTokens.fontPrimary,
        fontSize: rawTokens.fontSize14,
        fontWeight: rawTokens.weightMedium,
    },
});

export const Button = React.forwardRef<View, ButtonNativeProps>(function Button(
    {
        children,
        onClick,
        onLongPress,
        delayLongPress,
        variant = 'primary',
        size = 'medium',
        disabled = false,
        isLoading = false,
        fullWidth = false,
        iconBefore,
        iconAfter,
        'aria-label': ariaLabel,
        accessible,
        style: userStyle,
    },
    ref
) {
    const { theme } = useTheme();
    const colors = theme.colors;

    const variantStyles: Record<ButtonVariant, object> = {
        primary: { backgroundColor: colors.colorPrimary, borderColor: colors.colorPrimary },
        secondary: { backgroundColor: 'transparent', borderColor: colors.colorBorderPrimary },
        tertiary: { backgroundColor: 'transparent', borderColor: 'transparent' },
        destructive: { backgroundColor: colors.colorSurfaceDestructive, borderColor: colors.colorSurfaceDestructive },
    };

    const disabledVariantStyles: Record<ButtonVariant, object> = {
        primary: { backgroundColor: colors.colorSurfaceDisabled, borderColor: colors.colorSurfaceDisabled },
        secondary: { backgroundColor: 'transparent', borderColor: colors.colorBorderPrimary },
        tertiary: { backgroundColor: 'transparent', borderColor: 'transparent' },
        destructive: { backgroundColor: colors.colorSurfaceDisabled, borderColor: colors.colorSurfaceDisabled },
    };

    const iconColorMap: Record<ButtonVariant, string> = {
        primary: colors.colorOnPrimary,
        secondary: colors.colorTextPrimary,
        tertiary: colors.colorPrimary,
        destructive: colors.colorTextPrimary,
    };

    const hasChildren = children !== null && children !== undefined && children !== false;
    const hasiconBefore = Boolean(iconBefore);
    const hasiconAfter = Boolean(iconAfter);
    const isIconOnly = !hasChildren && (hasiconBefore || hasiconAfter);
    const iconSize = iconSizeMap[size];
    const isInteractionDisabled = disabled || isLoading;

    const textColor = disabled ? colors.colorTextDisabled : iconColorMap[variant];

    const withIconColor = (icon: React.ReactNode) =>
        React.isValidElement<{ color?: string }>(icon) && !icon.props.color
            ? React.cloneElement(icon, { color: textColor })
            : icon;

    return (
        <Pressable
            ref={ref}
            onPress={isInteractionDisabled ? undefined : onClick}
            onLongPress={isInteractionDisabled ? undefined : onLongPress}
            delayLongPress={delayLongPress}
            disabled={disabled}
            accessibilityLabel={ariaLabel}
            accessible={accessible}
            style={[
                staticStyles.base,
                size === 'medium' ? staticStyles.sizeMedium : staticStyles.sizeSmall,
                isIconOnly
                    ? size === 'medium' ? staticStyles.iconOnlyMedium : staticStyles.iconOnlySmall
                    : null,
                fullWidth ? staticStyles.fullWidth : null,
                disabled ? disabledVariantStyles[variant] : variantStyles[variant],
                userStyle,
            ]}
        >
            {hasiconBefore && !isLoading && (
                <View style={staticStyles.iconWrapper}>
                    {withIconColor(withIconSize(iconBefore, iconSize))}
                </View>
            )}

            {hasChildren && !isLoading && (
                typeof children === 'string'
                    ? <Text style={[staticStyles.label, { color: textColor }]}>{children}</Text>
                    : <>{children}</>
            )}

            {hasiconAfter && !isLoading && (
                <View style={staticStyles.iconWrapper}>
                    {withIconColor(withIconSize(iconAfter, iconSize))}
                </View>
            )}

            {isLoading && <ButtonSpinner color={textColor} />}
        </Pressable>
    );
});

Button.displayName = 'Button';
