import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark', // Mặc định là chế độ tối
  useSystemColorMode: false, // Không đồng bộ với hệ thống, bạn kiểm soát bằng ứng dụng
}

const theme = extendTheme({ config })

export default theme
