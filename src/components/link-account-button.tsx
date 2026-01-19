'use client'

import React from 'react'
import { Button } from './ui/button'
import { getAurinkoAuthorizationUrl } from '@/lib/aurinko'

const LinkAccountButton = () => {
  return (
    <Button onClick={async () => {
        const authUrl = await getAurinkoAuthorizationUrl('Google')
        window.location.href = authUrl
        console.log(authUrl)
    }}>
        Link Email Account
    </Button>
  )
}

export default LinkAccountButton
