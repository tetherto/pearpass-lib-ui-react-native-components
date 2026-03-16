import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
  rightSlotContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing8,
  },
  divider: {
    width: 1,
    height: tokens.spacing12,
    backgroundColor: tokens.colorBorderSecondary,
  },
  eyeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: tokens.spacing24,
    height: tokens.spacing24,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: tokens.spacing6,
    padding: 0,
    cursor: 'pointer',
  },
});
