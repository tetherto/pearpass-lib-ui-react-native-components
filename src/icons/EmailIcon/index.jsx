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
export const EmailIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
    >
      <Path
        d="M3 19.0254V5.02539H21V19.0254H3ZM12 12.1409L4 6.90989V18.0254H20V6.90989L12 12.1409ZM12 11.0254L19.6923 6.02539H4.30775L12 11.0254ZM4 6.90989V6.02539V18.0254V6.90989Z"
        fill={color}
      />
    </Svg>
  )
}
