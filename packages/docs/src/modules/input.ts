import { Input, DeviceList } from "input-map"

// We initialize a "singleton" of the input class
// Basically ensure we only ever have 1 (since that's all we need)
const input = new Input()

// // Add keyboard
// const player1Index = input.addPlayer("player1", DeviceList.KEYBOARD)
// console.log("created new player", player1Index)
// // We set the keys here, but ideally the user can set them anywhere/anytime
// input.setInputMap(INPUT_MAP, player1Index)

// const player2Index = input.addPlayer("player2")
// console.log("created new player", player2Index)
// // We set the keys here, but ideally the user can set them anywhere/anytime
// input.setInputMap(INPUT_MAP, player2Index)

export default input
