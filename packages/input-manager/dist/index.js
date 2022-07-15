var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DeviceList: () => DeviceList,
  Gamepad: () => Gamepad_default,
  Input: () => Input,
  Keyboard: () => Keyboard_default,
  useKeyPress: () => useKeyPress
});
module.exports = __toCommonJS(src_exports);

// src/components/Gamepad.tsx
var import_joymap = require("joymap");
var import_react2 = __toESM(require("react"));

// src/hooks/useLoop.tsx
var import_react = require("react");
var useLoop = (callback) => {
  const [frameTime, setFrameTime] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    let animationCallback;
    const animationLoop = (time) => {
      setFrameTime(time);
      callback(time);
      animationCallback = requestAnimationFrame(animationLoop);
    };
    requestAnimationFrame(animationLoop);
    return () => {
      cancelAnimationFrame(animationCallback);
    };
  }, []);
  return frameTime;
};
var useLoop_default = useLoop;

// src/types.ts
var DeviceList = /* @__PURE__ */ ((DeviceList2) => {
  DeviceList2[DeviceList2["NONE"] = 0] = "NONE";
  DeviceList2[DeviceList2["KEYBOARD"] = 1] = "KEYBOARD";
  DeviceList2[DeviceList2["MOUSE"] = 2] = "MOUSE";
  DeviceList2[DeviceList2["GAMEPAD"] = 3] = "GAMEPAD";
  DeviceList2[DeviceList2["TOUCH"] = 4] = "TOUCH";
  DeviceList2[DeviceList2["CUSTOM"] = 5] = "CUSTOM";
  return DeviceList2;
})(DeviceList || {});

// src/modules/playerInput.ts
function playerInput(gamepads, input, inputMap, addGamepad) {
  gamepads.forEach(({ name, module: module2 }) => {
    const gamepad = module2;
    const { players } = input;
    if (!gamepad)
      return;
    const currentPlayer = players.find((player) => player.name === name);
    if (!currentPlayer) {
      addGamepad(name);
      return;
    }
    const playerIndex = input.getPlayerIndex(currentPlayer.name);
    if (playerIndex < 0) {
      throw Error("Player was detected, but couldnt find player by name");
    }
    Object.keys(inputMap).forEach((inputKey) => {
      const checkKey = input.getKey(inputKey, playerIndex);
      if (checkKey !== gamepad.getButton(inputMap[inputKey]).pressed) {
        console.log("gamepad pressed", inputKey);
        input.setButton(inputKey, gamepad.getButton(inputMap[inputKey]).pressed, playerIndex, 3 /* GAMEPAD */);
      }
    });
  });
}

// src/components/Gamepad.tsx
var Gamepad = ({ maxGamepads = 4, input, inputMap }) => {
  const joymap = (0, import_react2.useRef)(null);
  const gamepads = (0, import_react2.useRef)([]);
  const addGamepad = (deviceId) => {
    console.log("adding new gamepad", deviceId);
    const newIndex = input.addPlayer(deviceId, 3 /* GAMEPAD */);
  };
  (0, import_react2.useEffect)(() => {
    var _a;
    if (!joymap.current) {
      joymap.current = (0, import_joymap.createJoymap)();
      gamepads.current = Array(maxGamepads).fill(0).map((player, index) => {
        var _a2;
        const queryModule = (0, import_joymap.createQueryModule)();
        (_a2 = joymap == null ? void 0 : joymap.current) == null ? void 0 : _a2.addModule(queryModule);
        return {
          name: `Gamepad${index + 1}`,
          module: queryModule
        };
      });
    } else {
      (_a = joymap == null ? void 0 : joymap.current) == null ? void 0 : _a.start();
    }
    return () => {
      var _a2;
      (_a2 = joymap == null ? void 0 : joymap.current) == null ? void 0 : _a2.stop();
    };
  }, []);
  useLoop_default(() => {
    playerInput(gamepads.current, input, inputMap, addGamepad);
  });
  return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null);
};
var Gamepad_default = Gamepad;

// src/modules/input.ts
var Input = class {
  constructor() {
    this.players = [];
    this.observers = /* @__PURE__ */ new Set();
  }
  setInputMap(keys, player = 0) {
    if (this.players[player]) {
      this.players[player].buttons = { ...keys };
    } else {
      throw Error(`Couldn't find that player`);
    }
  }
  setButton(keyName, value, player, device) {
    this.players[player].buttons[keyName] = value;
    this.players[player].device = device;
    this.observers.forEach(({ player: playerIndex, observer }) => playerIndex === player && observer(this.players[player]));
  }
  getKey(keyName, player = 0) {
    var _a, _b;
    return (_b = (_a = this.players) == null ? void 0 : _a[player]) == null ? void 0 : _b.buttons[keyName];
  }
  addPlayer(name, device) {
    let newPlayerIndex = this.players.length;
    this.players.push({
      name,
      device,
      buttons: {}
    });
    return newPlayerIndex;
  }
  removePlayer(name) {
    this.players.filter((player) => player.name !== name);
  }
  getPlayerIndex(playerName) {
    return this.players.findIndex((player) => player.name === playerName);
  }
  addObserver(player, observer) {
    this.observers.add({ player, observer });
  }
  removeObserver(player, observer) {
    this.observers.delete({ player, observer });
  }
};

// src/hooks/useKeyPress.tsx
var import_react3 = require("react");
function useKeyPress(targetKey, pressMethod, downMethod, upMethod) {
  const [keyPressed, setKeyPressed] = (0, import_react3.useState)(false);
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
      downMethod == null ? void 0 : downMethod();
    }
  }
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
      upMethod == null ? void 0 : upMethod();
    }
  };
  (0, import_react3.useEffect)(() => {
    let interval;
    if (keyPressed && pressMethod) {
      interval = setInterval(pressMethod, 1e3 / 60);
    }
    return () => {
      if (interval)
        clearInterval(interval);
    };
  }, [keyPressed, pressMethod]);
  (0, import_react3.useEffect)(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
  return keyPressed;
}

// src/components/Keyboard.tsx
var import_react4 = __toESM(require("react"));
var Keyboard = ({ input, inputMap, name = "player1" }) => {
  const [inputIndex, setInputIndex] = (0, import_react4.useState)(null);
  (0, import_react4.useEffect)(() => {
    if (!inputIndex) {
      const player1Index = input.addPlayer(name, 1 /* KEYBOARD */);
      if (player1Index >= 0) {
        setInputIndex(player1Index);
      } else {
        console.error("Player Index: ", player1Index, " // Input:", input);
        throw new Error(`Couldn't add keyboard to Input class via addPlayer method. Check if Input class is initalized.`);
      }
      console.log("created new player", player1Index);
      input.setInputMap(inputMap, player1Index);
    }
    return () => {
      if (!inputIndex) {
        input.removePlayer(name);
      }
    };
  }, []);
  (0, import_react4.useEffect)(() => {
    if (inputIndex) {
      input.setInputMap(inputMap, inputIndex);
    }
  }, [inputIndex, inputMap]);
  return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null);
};
var Keyboard_default = Keyboard;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceList,
  Gamepad,
  Input,
  Keyboard,
  useKeyPress
});
