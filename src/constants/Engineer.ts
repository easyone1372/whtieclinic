import { faker } from '@faker-js/faker';

export type EngineerRegisterObjectType = {
  [key: string]: {
    title: string;
    type: 'input' | 'checkbox';
  };
};
export const EngineerRegister: EngineerRegisterObjectType = {
  name: {
    title: '기사성함',
    type: 'input',
  },
  phone: {
    title: '연락처',
    type: 'input',
  },
  area: {
    title: '거주지역',
    type: 'input',
  },
  items: {
    title: '가능품목',
    type: 'checkbox',
  },
  specialNotes: {
    title: '특이사항',
    type: 'input',
  },
};

export const EngineerWashingMachineCategory = [
  '벽걸이',
  '원웨이',
  '포웨이',
  '원형',
  '스탠드',
  '실외기',
  '덕트',
  '창문형',
  '통돌이',
  '드럼',
  '빌트인',
  '건조기',
];

//faker api 데이터

export type EngineerData = {
  name: string;
  phone: string;
  area: string;
  items: string[];
  specialNotes: string;
};

export const generateEngineerData = (): EngineerData => ({
  name: faker.person.fullName(),
  phone: faker.phone.number(),
  area: faker.location.city(),
  items: faker.helpers.arrayElements(EngineerWashingMachineCategory, { min: 2, max: 4 }),
  specialNotes: faker.lorem.sentence(),
});
