import { EffiJS } from "@effijs/common";
import type { Modules } from "./index";

export function useModules() {
  return EffiJS.resolve<Modules>("Modules");
}
