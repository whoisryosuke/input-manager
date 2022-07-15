import { createJoymap, createQueryModule, Joymap } from "joymap"
import React, { useEffect, useRef } from "react"
import useLoop from "../hooks/useLoop"
import Input from "../modules/input"
import { DeviceList, JoymapGamepadModule, KeyState, Player } from "../types"
import playerInput from "../modules/playerInput"

type Props = {
  maxGamepads?: number
  input: Input
  inputMap: KeyState
}

const Gamepad = ({ maxGamepads = 4, input, inputMap }: Props) => {
  const joymap = useRef<Joymap | null>(null)
  const gamepads = useRef<{ name: string; module: JoymapGamepadModule }[]>([])

  // Adds gamepad to input-map
  const addGamepad = (deviceId: Player["deviceId"]) => {
    console.log("adding new gamepad", deviceId)
    const newIndex = input.addPlayer(deviceId, DeviceList.GAMEPAD)
  }

  /**
   * Lifecycle of gamepad API
   * When component mounts, a gamepad "tracker" is created and empty gamepads are assigned.
   * These gamepads get filled with devices once they connect,
   * offering direct access to gamepad input.
   */
  useEffect(() => {
    if (!joymap.current) {
      joymap.current = createJoymap()

      // We create "gamepads" to embody each separate gamepad
      // This is different than the "players" we define in Input class
      gamepads.current = Array(maxGamepads)
        .fill(0)
        .map((player, index) => {
          const queryModule = createQueryModule()
          joymap?.current?.addModule(queryModule)

          return {
            // We add 1 to index so it starts from Gamepad1
            name: `Gamepad${index + 1}`,
            module: queryModule
          }
        })
    } else {
      joymap?.current?.start()
    }

    return () => {
      joymap?.current?.stop()
    }
  }, [])

  // The frame/game loop
  // We run this 60fps (max) to sync gamepad input to Input class/store
  useLoop(() => {
    playerInput(gamepads.current, input, inputMap, addGamepad)
  })

  return <></>
}

export default Gamepad
