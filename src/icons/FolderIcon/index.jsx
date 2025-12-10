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

export const FolderIcon = (props) => {
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
        d="M3 19V5H9.59625L11.5963 7H21V19H3ZM4 18H20V8H11.1943L9.19425 6H4V18Z"
        fill={color}
      />
    </Svg>
  )
}
