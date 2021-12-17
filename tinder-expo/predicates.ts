type Diff<T, U> = T extends U ? never : T;

type Predicate<I, O extends I> = (i: I) => i is O;

const and = <I, O1 extends I, O2 extends I>(p1: Predicate<I, O1>, p2: Predicate<I, O2>) =>
    (i: I): i is (O1 & O2) => p1(i) && p2(i);

const or = <I, O1 extends I, O2 extends I>(p1: Predicate<I, O1>, p2: Predicate<I, O2>) =>
    (i: I): i is (O1 | O2) => p1(i) || p2(i);

const not = <I, O extends I>(p: Predicate<I, O>) =>
    (i: I): i is (Diff<I, O>) => !p(i);

export const isUndefined = <I>(i: I | undefined): i is undefined =>
    i === undefined;

export const isNotUndefined = not(isUndefined);
