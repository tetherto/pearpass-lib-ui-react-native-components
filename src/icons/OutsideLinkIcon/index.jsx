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

export const OutsideLinkIcon = (props) => {
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
        d="M4.5 20.1484V4.14844H11.7308V5.14844H5.5V19.1484H19.5V12.9177H20.5V20.1484H4.5ZM10.2385 15.1177L9.53075 14.4099L18.7923 5.14844H14.5V4.14844H20.5V10.1484H19.5V5.85619L10.2385 15.1177Z"
        fill={color}
      />
    </Svg>
  )
}
