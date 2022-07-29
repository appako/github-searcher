import { createContext, useContext, useMemo } from 'react';
import { Constructable, ContainerInstance } from 'typedi';
import { FCC } from '../lib/types';

const ctx = createContext<ContainerInstance>(null!);

type Svc = Constructable<any>;

type ReadonlyTypes<Tuple extends [...Svc[]]> = {
    [Index in keyof Tuple]: Readonly<Tuple[Index] extends Svc ? InstanceType<Tuple[Index]> : 'NOT_A_CLASS'>;
};

export const AppProvider: FCC = ({ children }) => {
    const app = useMemo(() => new ContainerInstance(Date.now().toString()), []);
    return <ctx.Provider value={app}>{children}</ctx.Provider>;
};

export function useService<T extends Svc>(serviceClass: T): Readonly<InstanceType<T>>;
export function useService<T1 extends Svc, T2 extends Svc, A extends [...Svc[]]>(
    svc1: T1,
    svc2: T2,
    ...svcs: [...A]
): [Readonly<InstanceType<T1>>, Readonly<InstanceType<T2>>, ...ReadonlyTypes<A>];
export function useService(...svcs: Svc[]): any {
    const app = useContext(ctx);
    return svcs.length === 1 ? app.get(svcs[0]) : svcs.map(svc => app.get(svc));
}
