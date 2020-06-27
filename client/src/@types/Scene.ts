interface Scene {
  id: string
  name: string
  type: string
  lights: Light[]
  owner: string
  recycle: boolean
}
