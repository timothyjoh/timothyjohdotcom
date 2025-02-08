import { faker } from '@faker-js/faker';

const titleize = (str: string) => str.replace('-', ' ').replace(/\w\S*/g, (txt)=> txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const nameScheme = titleize(`${faker.food.adjective()} ${faker.food.fruit()}`)
export const fakeName = () => `Anonymous${nameScheme.replace(/\s/g,'')}`

export const fakeColor = () => faker.internet.color()
