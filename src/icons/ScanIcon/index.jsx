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
export const ScanIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <Svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11.077 4.08893V2.85818H12.3077V4.08893H11.077ZM11.077 18.8582V17.6274H12.3077V18.8582H11.077ZM14.7693 4.08893V2.85818H16V4.08893H14.7693ZM14.7693 18.8582V17.6274H16V18.8582H14.7693ZM14.7693 15.1659V13.9352H16V15.1659H14.7693ZM14.7693 11.4737V10.2427H16V11.4737H14.7693ZM14.7693 7.78118V6.55043H16V7.78118H14.7693ZM4.923 18.8582H0V2.85818H4.923V3.85818H1V17.8582H4.923V18.8582ZM7.5 21.8582V0.242676H8.5V21.8582H7.5Z"
        fill={color}
      />
    </Svg>
  )
}
