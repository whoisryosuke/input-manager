import React from "react"
import input from "@/modules/input"
import { Gamepad, Keyboard } from "input-map"
import { GAMEPAD_MAP, KEYBOARD_MAP } from "@/input.config"

type Props = {}

const Input = (props: Props) => {
  console.log("players", input.players)
  console.log("Keyboard", Keyboard)
  return (
    <>
      <Keyboard input={input} inputMap={KEYBOARD_MAP} />
      <Gamepad input={input} inputMap={GAMEPAD_MAP} />
    </>
  )
}

export default Input
