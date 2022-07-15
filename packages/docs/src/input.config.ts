// We create a default input map to use across all devices
// You could also make separate input maps for different devices
// Or change the input map depending on the app's needs
export const INPUT_MAP = {
  Jump: false,
  MoveUp: false,
  MoveDown: false,
  Start: false
}

// We make a type of our input so we can easily make platform specific mappings
// (e.g. "Jump" action triggered by "A" button on Gamepad)
export type CustomInputMap = Record<keyof typeof INPUT_MAP, string>

// We create a map between the Input Map and the Gamepad inputs
// e.g. Jump might be "A" on PS4 controller
// Gamepad support is powered by joymap - check their docs for more
export const GAMEPAD_MAP: CustomInputMap = {
  Start: "start",
  Jump: "A",
  MoveUp: "dpadUp",
  MoveDown: "dpadDown"
}
export const KEYBOARD_MAP: CustomInputMap = {
  Start: "k",
  Jump: "f",
  MoveUp: "w",
  MoveDown: "s"
}
