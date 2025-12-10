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
export const RedirectIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M4 20V4H11.2308V5H5V19H19V12.7692H20V20H4ZM9.7385 14.9692L9.03075 14.2615L18.2923 5H14V4H20V10H19V5.70775L9.7385 14.9692Z"
        fill={color}
      />
    </Svg>
  )
}
