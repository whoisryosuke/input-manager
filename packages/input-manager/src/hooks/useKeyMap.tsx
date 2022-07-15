import { useEffect, useMemo, useState } from "react"
import Input from "../modules/input"
import { DeviceList, KeyState } from "../types"

/**
 * Takes an input map, assigns it to a keyboard, and syncs keyboard input with Input class/store
 * e.g. keyMap = { Jump: 'g' } would sync input store with "g" key press state (pressed = true, up = false)
 *
 * @param keyMap - An object with keys for "actions" and values are keyboard keys (pass array for multiple keys)
 * @param input - Initialized Input class to pass things into
 * @param playerIndex - The index of the "player" in the input class (aka which person we're adding this device to)
 * @returns Current keys pressed
 */
export default function useKeyMap(keyMap: Record<string, string>, input: Input, playerIndex: number) {
  // State for keeping track of whether key is pressed
  // Key name is string, boolean is pressed state
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({})

  // Take the input map and convert it to a better hash map
  // where keyboard is key and input action is value
  // that way we can easily look it up during down/up handler to avoid extra key lookup
  // and we memoize to ensure we don't recalc each re-render
  const organizedKeyMap = useMemo(() => Object.entries(keyMap).reduce((allKeys, [action, keyboardKey]) => (allKeys[keyboardKey] = action), {}), [keyMap])

  // If pressed key is our target key then set to true
  function downHandler({ key }: KeyboardEvent): void {
    if (key in organizedKeyMap) {
      setKeysPressed({
        [key]: true
      })
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: KeyboardEvent): void => {
    if (key in organizedKeyMap) {
      setKeysPressed({
        [key]: false
      })
      input.setButton(organizedKeyMap[key], false, playerIndex, DeviceList.KEYBOARD)
    }
  }

  // Add event listeners for keypress
  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return keysPressed
}
