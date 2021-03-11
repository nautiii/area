import Sidebar from './../app/Sidebar'

export default {
  title: 'App/Sidebar',
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Sidebar },
  template: '<Sidebar v-bind="$props"/>'
})

export const Primary = Template.bind({})
Primary.args = {
  items: [
    {
      icon: 'mdi-home',
      title: 'Home',
      to: '/'
    },
    {
      icon: 'mdi-apps',
      title: 'Your actions',
      to: '/actions'
    },
    {
      icon: 'mdi-download',
      title: 'APK',
      to: '/apk'
    },
    {
      icon: 'mdi-information',
      title: 'About',
      to: '/about'
    }
  ],
  backgroundColor: '#363636',
  textColor: '#F8F9F9'
}
