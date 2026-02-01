import { DeepPartial } from "@/types/utils/deepPartial";

export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function userFactory(overrides: DeepPartial<User> = {}): User {
  return {
    name: "João Silva",
    id: crypto.randomUUID(),
    email: "joao.silva@email.com",
    image: "https://example.com/avatar.png",
    ...overrides,
  };
}
