import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@radix-ui/react-navigation-menu"
import { Link } from "react-router-dom"
import { Cart } from "./cart"

export function NavBar() {
  return (
    <div className="flex justify-between mb-5">
      <h3>LOGO</h3>
      <NavigationMenu>
        <NavigationMenuList className="flex justify-between gap-5 ">
          <NavigationMenuItem>
            <Link to="/docs">
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs">
              <NavigationMenuLink>Dashboard</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs">
              <NavigationMenuLink>About us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Cart />
    </div>
  )
}
