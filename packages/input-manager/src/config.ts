export const MAX_GAMEPADS = 4

export const INPUT_MAP = {
  Jump: false,
  MoveUp: false,
  MoveDown: false,
  Start: false
}

export type CustomInputMap = Record<keyof typeof INPUT_MAP, string>

// We create a map between the Input Map and the Gamepad inputs
// e.g. Jump might be "x" on PS4 controller - or an ID like 13
export const GAMEPAD_MAP: CustomInputMap = {
  Start: "start",
  Jump: "A",
  MoveUp: "dpadUp",
  MoveDown: "dpadDown"
}
