import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ArrowButton, ArrowButtonProps } from './ArrowButton';

// Конфигурация метаданных для стори
const meta: Meta<ArrowButtonProps> = {
  title: 'Components/ArrowButton',
  component: ArrowButton,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Флаг, указывающий, открыт ли сайдбар',
    },
  },
};

export default meta;

const Template: StoryObj<ArrowButtonProps> = {
  render: (args) => <ArrowButton {...args} />,
};

export const Opened: StoryObj<ArrowButtonProps> = {
  ...Template,
  args: {
    isOpen: true,
  },
};

export const Closed: StoryObj<ArrowButtonProps> = {
  ...Template,
  args: {
    isOpen: false,
  },
};
