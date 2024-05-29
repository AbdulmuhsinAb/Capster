import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenFromStorage() {
  const token = localStorage.getItem("token")
  if (!token) return null

  return token
}

export function filterToken(decodedToken: unknown) {
  const decodedUser: any = {}
  if (decodedToken) {
    for (const [key, value] of Object.entries(decodedToken)) {
      let claimKey = ""
      if (key.startsWith("http")) {
        claimKey = key.split("identity/claims/")[1]
      } else {
        claimKey = key
      }
      decodedUser[claimKey] = value
    }
  }
  return decodedUser
}
