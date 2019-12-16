import { importIcons } from '~/modules/@today/icons/lib/core/icons'

export default ({ store }, inject) => {

  const options = <%= serialize(options) %>

  inject('icons', importIcons())
}
