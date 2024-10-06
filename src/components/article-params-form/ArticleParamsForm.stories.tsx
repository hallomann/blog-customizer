import { Meta, StoryObj } from '@storybook/react';
import { ArticleParamsForm, ArticleParamsFormProps } from './ArticleParamsForm';

const meta: Meta<ArticleParamsFormProps> = {
  title: 'Components/ArticleParamsForm',
  component: ArticleParamsForm,
};

export default meta;

const Template: StoryObj<ArticleParamsFormProps> = {
  render: (args) => <ArticleParamsForm {...args} />,
  args: {
    isOpen: true,
    onClose: () => console.log('Закрытие формы'),
    onApply: (styles) => console.log('Применение настроек:', styles),
    onReset: () => console.log('Сброс настроек'),
  },
};

export const Open: StoryObj<ArticleParamsFormProps> = {
  ...Template,
  args: {
    ...Template.args,
    isOpen: true,
  },
};

export const Closed: StoryObj<ArticleParamsFormProps> = {
  ...Template,
  args: {
    ...Template.args,
    isOpen: false,
  },
};
