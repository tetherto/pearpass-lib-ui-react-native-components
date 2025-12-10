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
export const LaptopIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <Svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.5 18.8845V17.8845H5.1155V17.1152H3.5V5.11523H21.5V17.1152H19.8845V17.8845H23.5V18.8845H1.5ZM4.5 16.1152H20.5V6.11523H4.5V16.1152Z"
        fill={color}
      />
    </Svg>
  )
}
