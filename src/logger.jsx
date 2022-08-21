import axios from 'axios'

export const postLog = async (username, action, file_name) => {
  await axios.post('/api/v1/users/admin/monitor', {
    username,
    action,
    file_name,
  })
}
