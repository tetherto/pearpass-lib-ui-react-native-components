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
export const CollapseIcon = (props) => {
  const { width, height, color } = getIconProps(props)
  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M9.56738 20V4H10.5674V20H9.56738ZM12.9519 15.6345V8.3845L16.4329 12L12.9519 15.6345Z"
        fill={color}
      />
    </Svg>
  )
}
