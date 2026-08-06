import { Admin, User, type UserState } from "#shared/classes/People.ts";

export const useUser = () => {
  const user = useState("user", () => {
    return {
      currentUser: {
        name: "John",
        gender: "male"
      },
      items: []
    } as UserState;
  });

  const auth = true;

  return auth ? new Admin(user) : new User(user);
};