import ServiceAuth from './../ServiceAuth'

export default {
  title: 'Pages/ServiceAuth',
  component: ServiceAuth,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ServiceAuth },
  template: '<ServiceAuth v-bind="$props"/>'
})

export const Primary = Template.bind({})
Primary.args = {
  serviceTitle: 'Google',
  serviceLogo: '/image/google_logo.png'
}
