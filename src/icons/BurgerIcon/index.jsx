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
export const BurgerIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <Svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0.0999756 1.1999V0.399902H14.9V1.1999H0.0999756ZM0.0999756 11.5999V10.7999H14.9V11.5999H0.0999756ZM0.0999756 6.3999V5.5999H14.9V6.3999H0.0999756Z"
        fill={color}
      />
    </Svg>
  )
}
