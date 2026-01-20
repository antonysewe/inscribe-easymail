'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Mail = dynamic(() => import('./mail'),{
  ssr: false,
})


const MailDashboard = () => {
  const defaultLayout = [20, 32, 48]
  const defaultCollapsed = false

  return (
    <Mail
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
  )
}

export default MailDashboard
