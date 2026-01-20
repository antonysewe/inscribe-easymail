"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api, type RouterOutputs } from "@/trpc/react"
import { useLocalStorage } from "usehooks-ts"
import { Plus } from "lucide-react"
import { getAurinkoAuthorizationUrl } from "@/lib/aurinko"

type Props = {
    isCollapsed: boolean
}

export const AccountSwitcher = (isCollapsed: Props) => {
    const { data } = api.account.getAccounts.useQuery();
    const [accountId, setAccountId] = useLocalStorage('accountId', '')

    if (!data) return null;

  return (
    <Select defaultValue={accountId} onValueChange={setAccountId}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
          "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <span className={cn({ "hidden": !isCollapsed })}>
            {
              data.find((account) => account.id === accountId)?.emailAddress[0]
            }
          </span>
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {
              data.find((account) => account.id === accountId)
                ?.emailAddress
            }
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {data.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {/* {account.icon} */}
              {account.emailAddress}
            </div>
          </SelectItem>
        ))}
        <div onClick={async (e) => {
          const url = await getAurinkoAuthorizationUrl('Google')
          window.location.href = url
        }} className="relative flex hover:bg-gray-50 w-full cursor-pointer items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <Plus className="size-4 mr-1" />
          Add account
        </div>
      </SelectContent>
    </Select>
  )
}