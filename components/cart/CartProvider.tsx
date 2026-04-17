"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Minimal shape of the pieces of Snipcart we touch. Snipcart doesn't ship
// TypeScript types, so we hand-roll what we need.
interface SnipcartStoreState {
  cart: {
    items: {
      count: number;
    };
  };
}

interface SnipcartAPI {
  theme: {
    cart: {
      open: () => void;
      close: () => void;
    };
  };
}

interface SnipcartGlobal {
  store: {
    getState: () => SnipcartStoreState;
    subscribe: (listener: () => void) => () => void;
  };
  api: SnipcartAPI;
  events: {
    on: (event: string, handler: (...args: unknown[]) => void) => void;
  };
}

declare global {
  interface Window {
    Snipcart?: SnipcartGlobal;
  }
}

interface CartContextValue {
  itemCount: number;
  openCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemCount, setItemCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    function wireSnipcart() {
      const snipcart = window.Snipcart;
      if (!snipcart) return;

      const sync = () => {
        try {
          const state = snipcart.store.getState();
          setItemCount(state.cart.items.count ?? 0);
        } catch {
          // Store might not be fully hydrated yet
        }
      };

      sync();
      unsubscribe = snipcart.store.subscribe(sync);
    }

    if (window.Snipcart) {
      wireSnipcart();
    } else {
      document.addEventListener("snipcart.ready", wireSnipcart, { once: true });
    }

    return () => {
      document.removeEventListener("snipcart.ready", wireSnipcart);
      unsubscribe?.();
    };
  }, []);

  const openCart = useCallback(() => {
    window.Snipcart?.api?.theme?.cart?.open?.();
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      itemCount,
      openCart,
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
    }),
    [itemCount, openCart, searchOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
