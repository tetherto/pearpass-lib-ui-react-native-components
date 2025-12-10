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
export const ApplicationIcon = (props) => {
  const { width, height, color } = getIconProps(props)
  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
    >
      <Path
        d="M11.7969 19.7113V12.2843L5.29688 8.52081V15.9478L11.7969 19.7113ZM12.7969 19.7113L19.2969 15.9478V8.52081L12.7969 12.2843V19.7113ZM12.2969 11.4248L18.7219 7.71131L12.2969 3.99781L5.87188 7.71131L12.2969 11.4248ZM4.29688 16.5458V7.44981L12.2969 2.85156L20.2969 7.44981V16.5458L12.2969 21.1441L4.29688 16.5458Z"
        fill={color}
      />
    </Svg>
  )
}
