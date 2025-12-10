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
export const WebsiteIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 15"
      fill="none"
    >
      <Path
        d="M7 14C10.5899 14 13.5 11.0899 13.5 7.5C13.5 3.91015 10.5899 1 7 1C3.41015 1 0.5 3.91015 0.5 7.5C0.5 11.0899 3.41015 14 7 14Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.48 4H8.47998C7.94955 4 7.44084 4.21071 7.06577 4.58579C6.69069 4.96086 6.47998 5.46957 6.47998 6C6.47998 6.53043 6.69069 7.03914 7.06577 7.41421C7.44084 7.78929 7.94955 8 8.47998 8C8.7452 8 8.99955 8.10536 9.18709 8.29289C9.37462 8.48043 9.47998 8.73478 9.47998 9V13.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M0.580017 8.5H3.00002C3.53045 8.5 4.03916 8.71071 4.41423 9.08579C4.7893 9.46086 5.00002 9.96957 5.00002 10.5V13.69"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
