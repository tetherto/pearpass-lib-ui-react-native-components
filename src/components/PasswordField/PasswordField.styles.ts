import { css } from 'react-strict-dom';
import { tokens } from '../../theme/tokens.css';

export const styles = css.create({
  rightSlotContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing12,
  },
  divider: {
    width: 1,
    height: tokens.spacing12,
    backgroundColor: tokens.colorBorderSecondary,
  },
});
