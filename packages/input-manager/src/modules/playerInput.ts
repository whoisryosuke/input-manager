import { DeviceList, JoymapGamepadModule, KeyState, Player } from "../types"
import Input from "./input"
import { PlayerInputState } from "../types"

/**
  This method runs every frame per second to update the input state with
  latest gamepad input.
*/
export default function playerInput(gamepads: any, input: Input, inputMap: KeyState, addGamepad: (deviceId: Player["deviceId"]) => void) {
  // Loop through all detected gamepads
  gamepads.forEach(({ name, module }) => {
    // Typescript thinks `module` = NodeJS module typing
    // good reason never to name anything module lol
    // @ts-ignore
    const gamepad = module as JoymapGamepadModule
    const { players } = input

    // Bail out if gamepad doesn't exist for some reason
    // This might not be necessary...
    if (!gamepad) return

    // This is the Gamepad device info (e.g. "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)")
    // const gamepadId = gamepad.getPadId()

    // Look through players and see if gamepad has been added
    const currentPlayer = players.find((player: PlayerInputState) => player.name === name)

    // No gamepad in player list? Add one!
    if (!currentPlayer) {
      // Create new player in store with gamepad ID
      addGamepad(name)
      return
    }

    // Grab the player ID by their name
    const playerIndex = input.getPlayerIndex(currentPlayer.name)
    // Did we find an input map for that player? Error out if not
    // This is more for debug purposes - since this reflects an issue with library
    // @todo: Replace with unit test?
    if (playerIndex < 0) {
      throw Error("Player was detected, but couldnt find player by name")
    }

    // Loop through input keys and match to our "map" above
    Object.keys(inputMap).forEach((inputKey) => {
      // We check the current state of the input
      const checkKey = input.getKey(inputKey, playerIndex)

      // If state is different, we update (to avoid expensive recalls)
      if (checkKey !== gamepad.getButton(inputMap[inputKey]).pressed) {
        console.log("gamepad pressed", inputKey)
        input.setButton(inputKey, gamepad.getButton(inputMap[inputKey]).pressed, playerIndex, DeviceList.GAMEPAD)
      }
    })
  })
}
