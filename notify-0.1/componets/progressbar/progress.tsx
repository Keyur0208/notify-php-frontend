'use client'
import { AppProgressBar } from 'next-nprogress-bar'

export const ProgressBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <AppProgressBar
        color="#4154f1"
        height='2px'
        shallowRouting={false}
      />
    </>
  )
}
