import React, { useEffect, useState } from "react"
import Input from "../modules/input"
import { DeviceList, KeyState } from "../types"

type Props = {
  input: Input
  inputMap: KeyState
  name: string
}

const Keyboard = ({ input, inputMap, name = "player1" }: Props) => {
  // We use this to keep track of the "player" in the Input class
  // so we can change the input mapping later
  const [inputIndex, setInputIndex] = useState<number | null>(null)

  // Add keyboard if it doesn't exist
  useEffect(() => {
    if (!inputIndex) {
      // Add keyboard
      const player1Index = input.addPlayer(name, DeviceList.KEYBOARD)
      if (player1Index >= 0) {
        setInputIndex(player1Index)
      } else {
        // Did it fail? Error out.
        console.error('Player Index: ', player1Index, ' // Input:',  input)
        throw new Error(`Couldn't add keyboard to Input class via addPlayer method. Check if Input class is initalized.`)
      }
      console.log("created new player", player1Index)
      // We set the keys here, but ideally the user can set them anywhere/anytime
      input.setInputMap(inputMap, player1Index)
    }

    return () => {
      if (!inputIndex) {
        input.removePlayer(name)
      }
    }
  }, [])

  // Update input map if user changes it on the fly
  useEffect(() => {
    if (inputIndex) {
      input.setInputMap(inputMap, inputIndex)
    }
  }, [inputIndex, inputMap])

  // Save keyboard input to input class/store. The action happens here
  // useEffect(() => {})

  return <></>
}

export default Keyboard
