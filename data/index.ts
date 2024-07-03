import { RiShoppingCartLine, RiDashboard3Line } from "react-icons/ri"
import { BiPurchaseTagAlt, BiCategoryAlt } from "react-icons/bi"
import { FaRegUser } from "react-icons/fa"
import { BiSolidOffer } from "react-icons/bi"
export const menu = [
    {
        title: "Dashboard",
        icon: RiDashboard3Line,
        href: "/admin/dashboard"
    },
    {
        title: "Products",
        icon: RiShoppingCartLine,
        href: "/admin/products"
    },
    {
        title: "Orders",
        icon: BiPurchaseTagAlt,
        href: "/admin/orders"
    },
    {
        title: "Users",
        icon: FaRegUser,
        href: "/admin/users"
    },
    {
        title: "Promotions",
        icon: BiSolidOffer,
        href: "/admin/promos"
    },
    {
        title: "Categories",
        icon: BiCategoryAlt,
        href: "/admin/categories"
    },

]