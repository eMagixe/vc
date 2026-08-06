import { s as stateDiagnostics, u as useNuxtApp } from '../virtual/entry.mjs';
import { toRef, isRef } from 'vue';

var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var _age;
class User {
  constructor(state) {
    __publicField(this, "state", null);
    __privateAdd(this, _age, 0);
    this.state = state;
  }
  getAge() {
    return __privateGet(this, _age);
  }
  setName(name) {
    if (this.state) {
      this.state.value.currentUser.name = name;
    }
  }
}
_age = new WeakMap();
class Admin extends User {
  constructor() {
    super(...arguments);
    __publicField(this, "role", "admin");
  }
  setGender(gender) {
    if (this.state) {
      this.state.value.currentUser.gender = gender;
    }
  }
}

//#region node_modules/nuxt/dist/app/composables/state.js
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw stateDiagnostics.NUXT_E7009({ key: _key });
	if (init !== void 0 && typeof init !== "function") throw stateDiagnostics.NUXT_E7007({ type: typeof init });
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (init) nuxtApp._state[key] ??= { _default: init };
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return initialValue;
		}
		state.value = initialValue;
	}
	return state;
}
//#endregion
//#region app/composables/useUser.ts
var useUser = () => {
	const user = useState("user", () => {
		return {
			currentUser: {
				name: "John",
				gender: "male"
			},
			items: []
		};
	});
	return new Admin(user);
};

export { Admin as A, useUser as u };
//# sourceMappingURL=useUser-C9hX4r0U.mjs.map
