import * as React from 'react'
import Mousetrap from 'mousetrap'

import type { ReactHotKeyProps } from './'
import { normalizeShortcuts } from '../Getkeys'

export const useShortcut: React.FC<ReactHotKeyProps> = ({ keys, onKeysPressed }) => {
  // Normalize the shortcuts in a state
  const normalizedKeys = React.useMemo(() => normalizeShortcuts(keys), [keys])

  React.useEffect(() => {
    // Bind the keys using Mousetrap when the component mounts
    Mousetrap.bind(normalizedKeys, onKeysPressed)

    // Unbind the keys when the component unmounts
    return () => {
      Mousetrap.unbind(normalizedKeys)
    }
  }, [normalizedKeys, onKeysPressed])

  // The component doesn't render anything
  return null
}
