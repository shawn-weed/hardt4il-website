import { useSelector } from "react-redux"

export default function ThemeProvider({children}) {
    const {theme} = useSelector(state => state.theme)
  return (
    <div className={theme}>
        <div className="bg-white text-gray-900 dark:bg-[#2d2d2d] dark:text-gray-200 min-h-screen">
          {children}
        </div>
    </div>
  )
}
