import api from '../api/index.js'

export default ({
  Vue
}) => {
  Vue.prototype.$api = api
}
