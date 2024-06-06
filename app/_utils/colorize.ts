import { EOrderStatus } from "@/_lib/enums"

export const colorizeOrderStatus = (status: EOrderStatus) => {
  switch (status) {
    case EOrderStatus.PENDING:
      return "bg-yellow-100 text-yellow-800"
    case EOrderStatus.PICKING_UP:
      return "bg-blue-100 text-blue-800"
    case EOrderStatus.DELIVERING:
      return "bg-blue-200 text-blue-800"
    case EOrderStatus.DELIVERED:
      return "bg-green-100 text-green-800"
    case EOrderStatus.COMPLETED:
      return "bg-green-200 text-green-800"
    case EOrderStatus.CANCELED:
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
