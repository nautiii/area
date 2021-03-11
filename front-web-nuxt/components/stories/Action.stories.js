import Action from './../Action'

export default {
  title: 'Pages/Action',
  component: Action,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Action },
  template: '<Action v-bind="$props"/>'
})

export const Primary = Template.bind({})
Primary.args = {
  actionServiceProps: 'Google drive',
  actionProps: 'File created',
  reactionServiceProps: 'Google calendar',
  reactionProps: 'Create event'
}
