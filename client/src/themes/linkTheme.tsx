import { FlowbiteNavbarLinkTheme } from "flowbite-react";

export const linkTheme : FlowbiteNavbarLinkTheme = {
    "base": "block py-2 pl-3 pr-4 md:p-0",
    "active": {
      "on": "bg-[#3688B7] text-white dark:text-white md:bg-transparent md:text-fuchsia-500",
      "off": "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 md:border-0 md:hover:bg-transparent md:hover:text-cyan-500 md:dark:hover:bg-transparent md:dark:hover:text-white"
},
    "disabled": {
        "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        "off": ""
    }
}