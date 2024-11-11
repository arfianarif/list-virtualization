import React from 'react'
import { cn } from '../lib/utils'

type Props = {
  className?: string
  children?: React.ReactNode
}

const Layout = ({ className, children }: Props) => {
  const rootClasses = cn(
    'relative flex flex-col w-full h-full overflow-x-hidden overflow-y-auto antialiased gap-6 min-h-lvh max-w-screen-lg mx-auto',
    className,
  )
  return <main className={rootClasses}>{children}</main>
}

export default Layout
