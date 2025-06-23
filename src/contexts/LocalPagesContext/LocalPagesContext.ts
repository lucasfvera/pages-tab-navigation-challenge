'use client';

import { useLocalPagesReturnType } from '@/contexts/LocalPagesContext/hooks/useLocalPages';
import { createContext } from 'react';

export const LocalPagesContext = createContext<useLocalPagesReturnType | null>(
	null
);
