import { ThemeConfig } from '../types';

import altitudes from './altitudes';
import borders from './borders';
import borderRadii from './borderRadii';
import breakpoints from './breakpoints';
import global from './global';
import palette from './palette';
import spacing from './spacing';
import fonts from './fonts';
import fontWeights from './fontWeights';
import fontSizes from './fontSizes';

import Container from './Container';
import Icon from './Icon';
import Toast from './Toast';

export default (overrides: ThemeConfig = {}) => ({
  name: 'default',
  ...overrides,
  altitudes: altitudes(overrides.altitudes || {}),
  borders: borders(overrides.borders || {}),
  borderRadii: borderRadii(overrides.borderRadii || {}),
  breakpoints: breakpoints(overrides.breakpoints || {}),
  fonts: fonts(overrides.fonts || {}),
  fontSizes: fontSizes(overrides.fontSizes || {}),
  fontWeights: fontWeights(overrides.fontWeights || {}),
  global: global(overrides.global || {}),
  spacing: spacing(overrides.spacing || {}),
  palette: palette(overrides.palette || {}),

  Container: Container(overrides.Container || {}),
  Icon: Icon(overrides.Icon || {}),
  Toast: Toast(overrides.Toast || {}),
});
