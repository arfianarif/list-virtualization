import { faker } from '@faker-js/faker'

export type Item = {
  id: string
  name: string
  image: string
  desc: string
}

export const generateFakeItems = (count: number): Item[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    desc: faker.lorem.sentence(),
  }))
}
