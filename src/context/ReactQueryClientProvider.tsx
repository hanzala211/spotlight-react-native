import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import React, { useState } from "react"

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}