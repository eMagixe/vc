import type { Ref } from "vue";

type UserExample = {
  name: string
  gender: string
}

export type UserState = {
  currentUser: UserExample
  items: UserExample[]
}

export class User {
  state: Ref<UserState> | null = null;
  #age: number = 0;

  constructor(state: Ref<UserState>) {
    this.state = state;
  }

  getAge(): number {
    return this.#age;
  }

  setName(name: string): void {
    if (this.state) {
      this.state.value.currentUser.name = name;
    }
  }
}

export class Admin extends User {
  role: string = "admin";

  setGender(gender: string): void {
    if (this.state) {
      this.state.value.currentUser.gender = gender;
    }
  }
}
