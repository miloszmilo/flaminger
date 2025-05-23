import React from 'react'
import Checkbox from '../atoms/Checkbox'

export default function MailingConsentCheckbox() {
  return (
    <Checkbox name="mailingConsent" required={false} className='mt-8'>
      I would like to receive job offers and platform updates over email.
    </Checkbox>
  )
}

