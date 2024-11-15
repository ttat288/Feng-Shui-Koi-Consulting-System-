import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark', // Mặc định là chế độ tối
  useSystemColorMode: false, // Không đồng bộ với hệ thống, bạn kiểm soát bằng ứng dụng
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      // Định nghĩa các kiểu mặc định cho thẻ HTML
      'html, body': {
        color: 'whiteAlpha.900', // Màu chữ mặc định cho dark mode
        bg: 'gray.800', // Màu nền cho dark mode
      },
      h1: {
        fontSize: '2xl',
        fontWeight: 'bold',
        marginBottom: '1rem',
      },
      h2: {
        fontSize: 'xl',
        fontWeight: 'semibold',
        marginBottom: '0.75rem',
      },
      h3: {
        fontSize: 'lg',
        fontWeight: 'medium',
        marginBottom: '0.5rem',
      },
      p: {
        fontSize: 'md',
        marginBottom: '0.5rem',
      },
    },
  },
});

export default theme;
