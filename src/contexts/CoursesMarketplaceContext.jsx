import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

import { getCourseById, STOCK_MARKET_COURSES } from 'data/stockMarketCourses';

const LS_CART = 'bp_courses_cart_v1';
const LS_PURCHASED = 'bp_courses_purchased_v1';
const LS_WISH = 'bp_courses_wishlist_v1';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota */
  }
}

let listeners = [];

function emit() {
  listeners.forEach((fn) => fn());
}

function subscribe(fn) {
  listeners = [...listeners, fn];
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

function getCart() {
  const ids = readJson(LS_CART, []);
  return Array.isArray(ids) ? ids.filter((id) => getCourseById(id)) : [];
}

function getPurchased() {
  const ids = readJson(LS_PURCHASED, []);
  return Array.isArray(ids) ? ids.filter((id) => getCourseById(id)) : [];
}

function getWishlist() {
  const ids = readJson(LS_WISH, []);
  return Array.isArray(ids) ? ids.filter((id) => getCourseById(id)) : [];
}

function setCart(ids) {
  writeJson(LS_CART, ids);
  emit();
}

function setPurchased(ids) {
  writeJson(LS_PURCHASED, ids);
  emit();
}

function setWishlist(ids) {
  writeJson(LS_WISH, ids);
  emit();
}

const CoursesMarketplaceContext = createContext(null);

export function CoursesMarketplaceProvider({ children }) {
  const cart = useSyncExternalStore(subscribe, getCart, () => []);
  const purchasedIds = useSyncExternalStore(subscribe, getPurchased, () => []);
  const wishlistIds = useSyncExternalStore(subscribe, getWishlist, () => []);

  const addToCart = useCallback((courseId) => {
    if (!getCourseById(courseId) || getPurchased().includes(courseId)) return;
    const cur = getCart();
    if (cur.includes(courseId)) return;
    setCart([...cur, courseId]);
  }, []);

  const removeFromCart = useCallback((courseId) => {
    setCart(getCart().filter((id) => id !== courseId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const checkoutCart = useCallback(() => {
    const cur = getCart();
    const have = new Set(getPurchased());
    cur.forEach((id) => have.add(id));
    setPurchased([...have]);
    setCart([]);
  }, []);

  const purchaseOne = useCallback((courseId) => {
    if (!getCourseById(courseId)) return;
    const have = new Set(getPurchased());
    have.add(courseId);
    setPurchased([...have]);
    setCart(getCart().filter((id) => id !== courseId));
  }, []);

  const toggleWishlist = useCallback((courseId) => {
    if (!getCourseById(courseId)) return;
    const w = getWishlist();
    if (w.includes(courseId)) setWishlist(w.filter((id) => id !== courseId));
    else setWishlist([...w, courseId]);
  }, []);

  const isPurchased = useCallback((courseId) => purchasedIds.includes(courseId), [purchasedIds]);
  const isInCart = useCallback((courseId) => cart.includes(courseId), [cart]);
  const isWishlisted = useCallback((courseId) => wishlistIds.includes(courseId), [wishlistIds]);

  const cartCourses = useMemo(() => cart.map((id) => getCourseById(id)).filter(Boolean), [cart]);
  const purchasedCourses = useMemo(() => purchasedIds.map((id) => getCourseById(id)).filter(Boolean), [purchasedIds]);

  const cartTotalINR = useMemo(() => cartCourses.reduce((s, c) => s + (c.priceINR || 0), 0), [cartCourses]);
  const cartListTotalINR = useMemo(() => cartCourses.reduce((s, c) => s + (c.listPriceINR || c.priceINR || 0), 0), [cartCourses]);

  const value = useMemo(
    () => ({
      courses: STOCK_MARKET_COURSES,
      cart,
      cartCourses,
      cartTotalINR,
      cartListTotalINR,
      purchasedIds,
      purchasedCourses,
      wishlistIds,
      addToCart,
      removeFromCart,
      clearCart,
      checkoutCart,
      purchaseOne,
      toggleWishlist,
      isPurchased,
      isInCart,
      isWishlisted
    }),
    [
      cart,
      cartCourses,
      cartTotalINR,
      cartListTotalINR,
      purchasedIds,
      purchasedCourses,
      wishlistIds,
      addToCart,
      removeFromCart,
      clearCart,
      checkoutCart,
      purchaseOne,
      toggleWishlist,
      isPurchased,
      isInCart,
      isWishlisted
    ]
  );

  return <CoursesMarketplaceContext.Provider value={value}>{children}</CoursesMarketplaceContext.Provider>;
}

export function useCoursesMarketplace() {
  const ctx = useContext(CoursesMarketplaceContext);
  if (!ctx) throw new Error('useCoursesMarketplace must be used within CoursesMarketplaceProvider');
  return ctx;
}
