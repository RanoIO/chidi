import { css, cx } from '@emotion/css';
import { ReactNode } from 'react';

export interface SVGIconProps {
  className?: string;
  title?: string;

  viewBox: string;
  children: ReactNode;
}

const style = css`
  display: inline-flex;
  width: 1rem;
  height: 1rem;

  align-self: center;

  fill: currentColor;
`;

export function SVGIcon(props: SVGIconProps) {
  return (
    <svg viewBox={props.viewBox} className={cx(style, 'svg-icon', props.className)}>
      {props.title ? <title>{props.title}</title> : null}
      {props.children}
    </svg>
  );
}
