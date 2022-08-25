/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      achromatic: {
        bg_default: '#FAFAFA',
        bg_paper: '#FFFFFF',
        text_primary: '#262E38',
        text_secondary: '#696969',
        text_disabled: '#9E9E9E',
        btn_active: '#696969',
        btn_disabled: '#AAAAAA',
        btn_disabled_bg: '#C9C9C9',
        btn_select: '#D3D3D3',
        btn_select_bg: '#F6F6F6',
        btn_hover: '#E4E4E4',
        btn_action_select: '#E2E2E2',
        acc_divider: '#C9C9C9',
        acc_divider_table: '#F2F8FB',
      },
      red: {
        DEFAULT: '#DC6B6D',
      },
      green: {
        DEFAULT: '#21BF64',
      },
      orange: {
        orange100: '#FD9009',
        orange60: '#FEBC6B',
      },
      blue: {
        DEFAULT: '#036DB7',
        blue90: '#1A7ABE',
        center_border: '#BAC7D5',
      },
    },
    extend: {
      width: {
        57: '228px',
        25: '100px',
      },
      minWidth: {
        57: '228px',
        25: '100px',
      },
      borderBottomWidth: {
        1: '1px',
      },
      inset: {
        '131px': '131px',
        '270px': '270px',
        '200px': '200px',
        '34px': '34px',
      },
    },
  },
  plugins: [],
};
