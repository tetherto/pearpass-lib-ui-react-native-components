import React from 'react';
import { css, html } from 'react-strict-dom';

const infoBoxEnter = css.keyframes({
  '0%': {
    opacity: 0,
    maxHeight: 0,
    transform: 'translateY(-8px)',
  },
  '100%': {
    opacity: 1,
    maxHeight: 200,
    transform: 'translateY(0)',
  },
});

const styles = css.create({
  container: {
    overflow: 'hidden',
    transitionProperty: 'opacity, max-height, transform',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-out',
  },
  visible: {
    opacity: 1,
    maxHeight: 200,
    transform: 'translateY(0)',
    animationName: infoBoxEnter,
    animationDuration: '200ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
  },
  hidden: {
    opacity: 0,
    maxHeight: 0,
    transform: 'translateY(-8px)',
  },
});

interface InfoBoxAnimatedContainerProps {
  visible: boolean;
  children: React.ReactNode;
}

export const InfoBoxAnimatedContainer = ({
  visible,
  children,
}: InfoBoxAnimatedContainerProps): React.ReactElement => (
  <html.div style={[styles.container, visible ? styles.visible : styles.hidden]}>
    {children}
  </html.div>
);
