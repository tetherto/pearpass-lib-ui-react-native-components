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
export const ArrowDownIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M3.19236 8.1636L4.25586 7.1001L12.5001 15.3443L20.7444 7.1001L21.8079 8.1636L12.5001 17.4713L3.19236 8.1636Z"
        fill={color}
      />
    </Svg>
  )
}
