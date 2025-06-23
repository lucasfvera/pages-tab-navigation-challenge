'use client';

import { useLocalPagesContext } from '@/contexts/LocalPagesContext/hooks/useLocalPagesContext';
import {
	closestCenter,
	DragEndEvent,
	MouseSensor,
	useSensor,
} from '@dnd-kit/core';
import {
	restrictToHorizontalAxis,
	restrictToParentElement,
} from '@dnd-kit/modifiers';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const DndContextDynamic = dynamic(
	() => import('@dnd-kit/core').then((mod) => mod.DndContext),
	{
		ssr: false,
		loading: () => <p className="h-[38px]">Loading...</p>,
	}
);

export const NavigationDndContext = ({ children }: { children: ReactNode }) => {
	const { setLocalPages } = useLocalPagesContext();
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			delay: 200,
			tolerance: 10,
		},
	});

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setLocalPages((items) => {
				const oldIndex = items.findIndex(
					(item) => item.id === active.id
				);
				const newIndex = items.findIndex(
					(item) => item.id === over?.id
				);

				const newItems = [...items];
				const [removed] = newItems.splice(oldIndex, 1);
				newItems.splice(newIndex, 0, removed);

				// Update positions after reordering
				return newItems.map((item, index) => ({
					...item,
					position: index,
				}));
			});
		}
	};

	return (
		<DndContextDynamic
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
			sensors={[mouseSensor]}
		>
			{children}
		</DndContextDynamic>
	);
};
