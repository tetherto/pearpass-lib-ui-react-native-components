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
export const EditIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <Svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0 21.3097V19.3097H20V21.3097H0ZM4 14.1367H5.073L13.873 5.34243L13.3405 4.79043L12.7943 4.26343L4 13.0634V14.1367ZM3 15.1367V12.6367L14.952 0.69043L17.4405 3.19618L5.5 15.1367H3ZM13.873 5.34243L13.3405 4.79043L12.7943 4.26343L13.873 5.34243Z"
        fill={color}
      />
    </Svg>
  )
}
