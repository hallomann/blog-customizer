import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

const Template: StoryObj<ButtonProps> = {
  render: (args) => <Button {...args} />,
};

export const Default: StoryObj<ButtonProps> = {
  ...Template,
  args: { // Аргументы по умолчанию для кнопки
    title: 'Обычная кнопка',
    onClick: () => alert('Клик по кнопке'),
  },
};

export const Apply: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    title: 'Применить',
    variant: 'apply',
    onClick: () => alert('Применить'),
  },
};

export const Reset: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    title: 'Сбросить',
    variant: 'reset',
    onClick: () => alert('Сбросить'),
  },
};
