'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { Billing } from '@/lib/products';

export type CartItem = {
  productSlug: string;
  productName: string;
  tierId: string;
  tierName: string;
  unitPriceCents: number;
  billing: Billing;
  termMonths?: number;
  quantity: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: 'hydrate'; items: CartItem[] }
  | { type: 'add'; item: Omit<CartItem, 'quantity'> }
  | { type: 'remove'; productSlug: string; tierId: string }
  | { type: 'setQuantity'; productSlug: string; tierId: string; quantity: number }
  | { type: 'clear' };

const STORAGE_KEY = 'maxora-cart';

function keyOf(i: { productSlug: string; tierId: string }) {
  return `${i.productSlug}:${i.tierId}`;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'hydrate':
      return { items: action.items };
    case 'add': {
      const existing = state.items.find((i) => keyOf(i) === keyOf(action.item));
      if (existing) {
        return {
          items: state.items.map((i) =>
            keyOf(i) === keyOf(action.item) ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, { ...action.item, quantity: 1 }] };
    }
    case 'remove':
      return { items: state.items.filter((i) => keyOf(i) !== keyOf(action)) };
    case 'setQuantity': {
      if (action.quantity < 1) {
        return { items: state.items.filter((i) => keyOf(i) !== keyOf(action)) };
      }
      return {
        items: state.items.map((i) =>
          keyOf(i) === keyOf(action) ? { ...i, quantity: action.quantity } : i,
        ),
      };
    }
    case 'clear':
      return { items: [] };
  }
}

type CartContextValue = {
  items: CartItem[];
  /** false until localStorage hydration; render badges only when true. */
  ready: boolean;
  count: number;
  subtotalCents: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productSlug: string, tierId: string) => void;
  setQuantity: (productSlug: string, tierId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [ready, setReady] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'hydrate', items: JSON.parse(raw) });
    } catch {
      // corrupted storage, start empty
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.quantity, 0);
    const subtotalCents = state.items.reduce((n, i) => n + i.unitPriceCents * i.quantity, 0);
    return {
      items: state.items,
      ready,
      count,
      subtotalCents,
      isDrawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem: (item) => {
        dispatch({ type: 'add', item });
        setDrawerOpen(true);
      },
      removeItem: (productSlug, tierId) => dispatch({ type: 'remove', productSlug, tierId }),
      setQuantity: (productSlug, tierId, quantity) =>
        dispatch({ type: 'setQuantity', productSlug, tierId, quantity }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [state.items, ready, isDrawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
