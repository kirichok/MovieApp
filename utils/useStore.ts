import { useEffect, useMemo, useState } from "react";
import { Store } from "@effijs/common";

export type TAlias = string;
export type TPath = string;
export type TKey =
  | TPath
  | Record<TAlias, TPath>
  | Array<TPath | Record<TAlias, TPath>>;

export function useStore<T>(store: Store.IStore, key: TKey): T {
  const [data, setData] = useState(store.get(key) as T);

  const hash = useMemo(() => JSON.stringify(key), [key]);

  useEffect(() => {
    const removeDataSubscription = store.subscribe(key, (data) =>
      setData(data as T),
    );
    return () => {
      removeDataSubscription();
      // setData({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return data;
}
