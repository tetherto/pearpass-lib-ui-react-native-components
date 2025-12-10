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

export const XIcon = (props) => {
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
        d="M6.66869 18.5935L5.96094 17.8858L11.5609 12.2858L5.96094 6.68578L6.66869 5.97803L12.2687 11.578L17.8687 5.97803L18.5764 6.68578L12.9764 12.2858L18.5764 17.8858L17.8687 18.5935L12.2687 12.9935L6.66869 18.5935Z"
        fill={color}
      />
    </Svg>
  )
}
