// Constants
const backgroundColor = '#222';
const foregroundColor = '#B0B0B0';
const borderColor = '#333';

// Colors
const RED = '#C75646';
const GREEN = '#8EB33B';
const YELLOW = '#D0B03C';
const BLUE = '#72B3CC';
const PINK = '#C8A0D1';
const CYAN = '#218693';
const LIGHT_GRAY = foregroundColor;
const MEDIUM_GRAY = '#5D5D5D';
const LIGHT_RED = '#E09690';
const LIGHT_GREEN = '#CDEE69';
const LIGHT_YELLOW = '#FFE377';
const LIGHT_BLUE = '#9CD9F0';
const LIGHT_PINK = '#FBB1F9';
const LIGHT_CYAN = '#77DFD8';
const WHITE = '#FFFFFF';

const colors = {
  black: backgroundColor,
  red: RED,
  green: GREEN,
  yellow: YELLOW,
  blue: BLUE,
  magenta: PINK,
  cyan: CYAN,
  white: LIGHT_GRAY,
  lightblack: MEDIUM_GRAY,
  lightRed: LIGHT_RED,
  lightGreen: LIGHT_GREEN,
  lightYellow: LIGHT_YELLOW,
  lightBlue: LIGHT_BLUE,
  lightMagenta: LIGHT_PINK,
  lightCyan: LIGHT_CYAN,
  lightWhite: WHITE,
};

const css = `
  /* Hide bottom border if tab is active, make bg lighter */
  .tab_tab {
    color: #{foregroundColor} !important;
    border-left: 0 none;
    border-right: 0 none;
  }

  .tab_active {
    color: #fff;
    background-color: ${backgroundColor} !important;
    height: calc(100% + 1px);
    border-left: 1px solid ${borderColor} !important;
    border-right: 1px solid ${borderColor} !important;
  }

  .tab_tab:last-child {
    border-right: 1px solid transparent !important;
  }

  /* Hide hardcoded black bottom border */
  .tab_active:before {
    border-bottom: none !important;
  }

  .tab_text {
    color: ${foregroundColor};
    border-color: transparent !important;
    opacity: 0.5;
  }

  .tab_active .tab_text {
    opacity: 1;
    color: ${WHITE};
  }
`;

// Apply theme
exports.decorateConfig = config => (
  Object.assign({}, config, {
    backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor: foregroundColor,
    colors,
    css: `
      ${config.css || ''}
      ${css}
    `,
  })
);

// Development middleware for HMR
exports.middleware = () => next => (action) => {
  /* eslint-disable no-param-reassign, default-case */
  switch (action.type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD':
      action.config.foregroundColor = foregroundColor;
      action.config.backgroundColor = backgroundColor;
      action.config.cursorColor = foregroundColor;
      action.config.borderColor = borderColor;
      action.config.colors = colors;
      action.config.css = css;
  }
  next(action);
};
