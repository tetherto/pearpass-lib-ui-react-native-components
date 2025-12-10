import Svg, { Path } from 'react-native-svg'

import { getIconProps } from '../getIconProps'

/**
 * @param {{
 *  size?: string;
 *  width?: string;
 *  height?: string;
 *  color?: string;
 * }} props
 */
export const KeyboardIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <Svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M4 10.0503V8.05029H14V10.0503H4ZM0 6.05029V4.05029H2V6.05029H0ZM4 6.05029V4.05029H6V6.05029H4ZM8 6.05029V4.05029H10V6.05029H8ZM12 6.05029V4.05029H14V6.05029H12ZM16 6.05029V4.05029H18V6.05029H16ZM0 2.05029V0.050293H2V2.05029H0ZM4 2.05029V0.050293H6V2.05029H4ZM8 2.05029V0.050293H10V2.05029H8ZM12 2.05029V0.050293H14V2.05029H12ZM16 2.05029V0.050293H18V2.05029H16Z"
        fill={color}
      />
    </Svg>
  )
}
