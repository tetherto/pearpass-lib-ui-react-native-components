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
export const HomeIcon = (props) => {
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
        d="M5.61523 20.5221V10.0221L12.6152 4.73364L19.6152 10.0221V20.5221H14.423V14.1376H10.8075V20.5221H5.61523Z"
        fill={color}
      />
    </Svg>
  )
}
