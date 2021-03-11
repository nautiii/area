import Header from './../app/Header'

export default {
  title: 'App/Header',
  component: Header,
  argTypes: {
    titleColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    loginButtonColor: { control: 'color' },
    signupButtonColor: { control: 'color' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header },
  template: '<Header v-bind="$props"/>'
})

export const Primary = Template.bind({})
Primary.args = {
  title: 'Area',
  titleColor: '#F8F9F9',
  backgroundColor: '#485679',
  logoPath: '/image/area_logo.png',
  log: true,
  loginButtonColor: '#e0e0e0',
  signupButtonColor: '#7082b0'
}
