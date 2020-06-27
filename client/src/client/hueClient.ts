const baseUrl = (ip: string, username: string) =>
  `https://${ip}/api/${username}`

export const getScenes = async (
  ip: string,
  username: string
): Promise<{ [id: string]: Scene }> => {
  const response = await fetch(baseUrl(ip, username) + '/scenes')
  return response.json()
}

export const getScene = async (
  ip: string,
  username: string,
  id: string
): Promise<Scene> => {
  const response = await fetch(baseUrl(ip, username) + '/scenes/' + id)
  return response.json()
}

export const deleteScene = async (ip: string, username: string, id: string) => {
  const response = await fetch(baseUrl(ip, username) + '/scenes/' + id, {
    method: 'DELETE',
  })
  return response.json()
}

export const getLights = async (
  ip: string,
  username: string
): Promise<{ [id: string]: Light }> => {
  const response = await fetch(`https://${ip}/api/${username}/lights`)
  return response.json()
}

export const updateLight = async (
  ip: string,
  username: string,
  id: string,
  state: { on: boolean; bri: any }
): Promise<any> => {
  const response = await fetch(
    `https://${ip}/api/${username}/lights/${id}/state`,
    {
      method: 'PUT',
      body: JSON.stringify({
        on: state.on,
        bri: Number(state.bri),
      }),
    }
  )
  return response.json()
}
