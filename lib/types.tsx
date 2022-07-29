import { FC, ReactNode } from 'react';

export type FCC<T = {}> = FC<T & { children: ReactNode }>;
