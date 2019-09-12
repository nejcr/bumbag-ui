import * as React from 'react';
import { Button as ReakitButton, ButtonProps as ReakitButtonProps, useButton as useReakitButton } from 'reakit';

import { useClassName, createComponent, createElement, createHook } from '../utils';
import { ButtonKind, ButtonType, Omit, Size, Palette } from '../types';
import { Box, BoxProps } from '../Box';
import { Icon, IconProps } from '../Icon';

import * as styles from './styles';

export type LocalButtonProps = {
  /** Icon that appears on the right side of the button. */
  iconAfter?: IconProps['icon'];
  iconAfterProps?: Omit<IconProps, 'icon'>;
  /** Icon that appears on the left side of the button. */
  iconBefore?: IconProps['icon'];
  iconBeforeProps?: Omit<IconProps, 'icon'>;
  /** TODO: Adds a loading indicator to the button. */
  isLoading?: boolean;
  /** Makes the button not interactable. */
  isStatic?: boolean;
  kind?: ButtonKind;
  palette?: Palette;
  size?: Size;
  type?: ButtonType;
};
export type ButtonProps = BoxProps & ReakitButtonProps & LocalButtonProps;

const useProps = createHook<ButtonProps>(
  (props, themeKey) => {
    let {
      disabled,
      focusable,
      iconAfter,
      iconAfterProps,
      iconBefore,
      iconBeforeProps,
      unstable_clickKeys,
      ...htmlProps
    } = props;
    const buttonProps = useReakitButton({ disabled, focusable, unstable_clickKeys }, htmlProps);
    htmlProps = Box.useProps({ ...props, ...buttonProps });

    const className = useClassName({
      style: styles.Button,
      styleProps: props,
      themeKey,
      prevClassName: htmlProps.className
    });
    const iconBeforeClassName = useClassName({
      style: styles.ButtonIcon,
      styleProps: { ...props, isBefore: true },
      themeKey: 'Button.Icon'
    });
    const iconAfterClassName = useClassName({
      style: styles.ButtonIcon,
      styleProps: { ...props, isAfter: true },
      themeKey: 'Button.Icon'
    });

    const children = (
      <React.Fragment>
        {iconBefore && <Icon className={iconBeforeClassName} icon={iconBefore} {...iconBeforeProps} />}
        {htmlProps.children}
        {iconAfter && <Icon className={iconAfterClassName} icon={iconAfter} {...iconAfterProps} />}
      </React.Fragment>
    );

    return { ...htmlProps, className, children };
  },
  { themeKey: 'Button' }
);

export const Button = createComponent<ButtonProps>(
  (props: ButtonProps) => {
    const buttonProps = useProps(props);
    return createElement({ children: props.children, component: ReakitButton, use: props.use, htmlProps: buttonProps });
  },
  {
    attach: {
      useProps
    },
    defaultProps: {
      disabled: false,
      iconAfter: undefined,
      iconBefore: undefined,
      isLoading: false,
      isStatic: false,
      kind: undefined,
      palette: 'default',
      size: 'default',
      type: 'button'
    },
    themeKey: 'Button'
  }
);
