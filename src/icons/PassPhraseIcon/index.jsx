import Svg, { Path } from 'react-native-svg'

import { getIconProps } from '../getIconProps'

/**
 * @param {{
 *  size?: string;
 *  width?: string;
 *  height?: string;
 *  color?: string;
 *  fill?: boolean
 * }} props
 */
export const PassPhraseIcon = (props) => {
  const { width, height, color, fill } = getIconProps(props)
  if (fill) {
    return (
      <Svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 17 17"
        fill="none"
      >
        <Path
          d="M4 12.9253H10V11.9253H4V12.9253ZM4 8.92529H13V7.92529H4V8.92529ZM4 4.92529H13V3.92529H4V4.92529ZM0.5 16.4253V0.425293H16.5V16.4253H0.5Z"
          fill={color}
        />
      </Svg>
    )
  } else {
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
          d="M7.49609 17H13.4961V16H7.49609V17ZM7.49609 13H16.4961V12H7.49609V13ZM7.49609 9H16.4961V8H7.49609V9ZM3.99609 20.5V4.5H19.9961V20.5H3.99609ZM4.99609 19.5H18.9961V5.5H4.99609V19.5Z"
          fill={color}
        />
      </Svg>
    )
  }
}
