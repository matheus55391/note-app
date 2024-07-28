import { Meta } from '@storybook/react';
import NoteCard, { NoteCardProps } from './NoteCard';

export default {
  title: 'Components/NoteCard',
  component: NoteCard,
  args: {
    title: 'Sample Note',
    isSelected: false,
  }
} as Meta<typeof NoteCard>;

export const Default = (args: NoteCardProps) => <NoteCard {...args} />;

export const Selected = (args: NoteCardProps) => <NoteCard {...args} isSelected={true} />;
