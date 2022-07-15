import { createQueryModule } from "joymap"

// ThreeJS
export type Triplet = [x: number, y: number, z: number]
export type Quad = [x: number, y: number, z: number, w: number]

// Input map types
export interface Player {
  name: string
  device: DeviceList
  deviceId: string
}
// "keys" or "actions" in the input map
export type KeyTypesNames = "boolean" | "number"
export type KeyTypes = boolean | number
export interface KeyMap {
  // Name of key (e.g. Jump or Move)
  name: string
  // Defaults to boolean
  type?: KeyTypes
}

export type KeyState = Record<string, KeyTypes>
// Devices can use this for "input map" props that accept custom user input mappings
export type InputMapGeneric<T> = Record<keyof T, boolean>

export enum DeviceList {
  NONE,
  KEYBOARD,
  MOUSE,
  GAMEPAD,
  TOUCH,
  CUSTOM
}

export type PlayerInputState = {
  name: string
  device: DeviceList
  buttons: KeyState
}
export type KeyCallbacks = (e: PlayerInputState) => void
export type InputObserver = {
  player: number
  observer: KeyCallbacks
}

// Joymap specific
export type JoymapGamepadModule = ReturnType<typeof createQueryModule>
