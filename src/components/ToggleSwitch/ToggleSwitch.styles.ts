import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing12,
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: tokens.spacing4,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    cursor: 'pointer'
  },
  label: {
    color: tokens.colorTextPrimary,
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    fontStyle: 'normal',
    fontWeight: tokens.weightMedium,
    lineHeight: 'normal'
  },
  description: {
    color: tokens.colorTextSecondary
  },
  rail: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '44px',
    height: '24px',
    paddingTop: '2px',
    paddingRight: '2px',
    paddingBottom: '2px',
    paddingLeft: '2px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '60px',
    cursor: 'pointer',
    userSelect: 'none',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'transparent',
    transitionProperty: 'background-color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-out'
  },
  railUnchecked: {
    backgroundColor: tokens.colorSurfaceElevatedOnInteraction
  },
  railChecked: {
    backgroundColor: tokens.colorPrimary
  },
  railDisabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
    opacity: 0.5
  },
  knob: {
    boxSizing: 'border-box',
    width: '20px',
    height: '20px',
    flexShrink: 0,
    borderRadius: '100px',
    backgroundColor: '#ECF1EE',
    transitionProperty: 'transform',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-out'
  },
  knobUnchecked: {
    transform: 'translateX(0px)'
  },
  knobChecked: {
    transform: 'translateX(20px)'
  }
})
