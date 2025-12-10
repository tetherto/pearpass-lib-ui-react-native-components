import Svg, { Path } from 'react-native-svg'

import { getIconProps } from '../getIconProps'

/**
 * @param {{
 *  size?: string;
 *  width?: string;
 *  height?: string;
 *  color?: string;
 *  fill? : boolean
 * }} props
 */

export const StarIcon = (props) => {
  const { width, height, color, fill } = getIconProps(props)

  if (fill) {
    return (
      <Svg
        {...props}
        width={width}
        height={height}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M8.13251 19.8106L9.37301 14.4971L5.24976 10.9261L10.6805 10.4548L12.8075 5.44531L14.9345 10.4548L20.3653 10.9261L16.242 14.4971L17.4825 19.8106L12.8075 16.9896L8.13251 19.8106Z"
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
        viewBox="0 0 25 25"
        fill="none"
      >
        <Path
          d="M8.85013 17.0846L12.0001 15.1846L15.1501 17.1096L14.3251 13.5096L17.1001 11.1096L13.4501 10.7846L12.0001 7.38463L10.5501 10.7596L6.90013 11.0846L9.67513 13.5096L8.85013 17.0846ZM7.32513 19.1826L8.56563 13.8691L4.44238 10.2981L9.87313 9.82688L12.0001 4.81738L14.1271 9.82688L19.5579 10.2981L15.4346 13.8691L16.6751 19.1826L12.0001 16.3616L7.32513 19.1826Z"
          fill={color}
        />
      </Svg>
    )
  }
}
