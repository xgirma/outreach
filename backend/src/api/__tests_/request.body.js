import faker from 'faker';
import { tempPassword } from '../modules/password';

export const admin = Object.assign({
  username: faker.internet.userName(),
  password: tempPassword,
});

export const info = {
  am: {
    name: faker.lorem.words(),
    denomination: faker.lorem.words(),
    bible: {
      verse: faker.lorem.sentence(),
      from: faker.lorem.words(),
    },
  },
  en: {
    name: faker.lorem.words(),
    denomination: faker.lorem.words(),
    bible: {
      verse: faker.lorem.sentence(),
      from: faker.lorem.words(),
    },
  },
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email().toLowerCase(),
  address: {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
  },
};

export const event = {
  am: {
    title: 'የትንሣኤያችን በኩር የሆነው ጌታ በመቃብሩ',
    description:
      'የትንሣኤያችን በኩር የሆነው ጌታ በመቃብሩ ቦታ ሥርዓትን እያስተማረ አልፎ አልፎም በግልጥ እየታየ ፍርሐታቸውን እያስወገደ አይሑድ እንደሚሉት ሥጋውንም ደቀመዛሙርቱ እንዳልሰረቁት ይልቁንም በሞት ላይ ሥልጣንኑን አሳይቶ መቃብሩን ባዶ አድርጐ በትንሣኤው አለት ላይ ያቆመን፣ ሞት በእርሱ እንደተሸነፈ የማይታየው እየታየ፣ ዘመን የማይቆጠርለት፣ ዘላለማዊ ጌታ የማይዳሰሰው እየተዳሰሰ ለ40 ቀናት ያኽል ቆይቶ ተከታዮቹን ሐዋርያትን ወደ ቢታንያ አወጣቸው። እያዩት በምስጋና ወደሰማይ ዐረገ።',
  },
  en: {
    title: 'የትንሣኤያችን በኩር የሆነው ጌታ በመቃብሩ',
    description:
      'የትንሣኤያችን በኩር የሆነው ጌታ በመቃብሩ ቦታ ሥርዓትን እያስተማረ አልፎ አልፎም በግልጥ እየታየ ፍርሐታቸውን እያስወገደ አይሑድ እንደሚሉት ሥጋውንም ደቀመዛሙርቱ እንዳልሰረቁት ይልቁንም በሞት ላይ ሥልጣንኑን አሳይቶ መቃብሩን ባዶ አድርጐ በትንሣኤው አለት ላይ ያቆመን፣ ሞት በእርሱ እንደተሸነፈ የማይታየው እየታየ፣ ዘመን የማይቆጠርለት፣ ዘላለማዊ ጌታ የማይዳሰሰው እየተዳሰሰ ለ40 ቀናት ያኽል ቆይቶ ተከታዮቹን ሐዋርያትን ወደ ቢታንያ አወጣቸው። እያዩት በምስጋና ወደሰማይ ዐረገ።',
  },
  address: {
    street: '1234 EastLake Ave East',
    city: 'Seattle',
    state: 'WA',
    zip: '98201',
    country: 'United States',
  },
  email: 'info@gedam.org',
  phone: '(425) 329 - 9092',
  dateStart: '2018-07-19T07:06:47.396Z',
  dateEnd: '2018-07-19T07:06:47.396Z',
};

export const services = {
  am: {
    title: 'The Divine Liturgy',
    description:
      'የትንሣኤያችን በኩር የሆነው ጌታ በመቃብሩ ቦታ ሥርዓትን እያስተማረ አልፎ አልፎም በግልጥ እየታየ ፍርሐታቸውን እያስወገደ አይሑድ እንደሚሉት ሥጋውንም ደቀመዛሙርቱ እንዳልሰረቁት ይልቁንም በሞት ላይ ሥልጣንኑን አሳይቶ መቃብሩን ባዶ አድርጐ በትንሣኤው አለት ላይ ያቆመን፣ ሞት በእርሱ እንደተሸነፈ የማይታየው እየታየ፣ ዘመን የማይቆጠርለት፣ ዘላለማዊ ጌታ የማይዳሰሰው እየተዳሰሰ ለ40 ቀናት ያኽል ቆይቶ ተከታዮቹን ሐዋርያትን ወደ ቢታንያ አወጣቸው። እያዩት በምስጋና ወደሰማይ ዐረገ።',
    contact: 'Diakon Mezmur Mekasha',
  },
  en: {
    title: 'The Divine Liturgy',
    description:
      'የትንሣኤያችን በኩር የሆነው ጌታ በመቃብሩ ቦታ ሥርዓትን እያስተማረ አልፎ አልፎም በግልጥ እየታየ ፍርሐታቸውን እያስወገደ አይሑድ እንደሚሉት ሥጋውንም ደቀመዛሙርቱ እንዳልሰረቁት ይልቁንም በሞት ላይ ሥልጣንኑን አሳይቶ መቃብሩን ባዶ አድርጐ በትንሣኤው አለት ላይ ያቆመን፣ ሞት በእርሱ እንደተሸነፈ የማይታየው እየታየ፣ ዘመን የማይቆጠርለት፣ ዘላለማዊ ጌታ የማይዳሰሰው እየተዳሰሰ ለ40 ቀናት ያኽል ቆይቶ ተከታዮቹን ሐዋርያትን ወደ ቢታንያ አወጣቸው። እያዩት በምስጋና ወደሰማይ ዐረገ።',
    contact: 'Diakon Mezmur Mekasha',
  },
  phone: '(425) 329 - 9092',
  email: 'info@gedam.org',
};

export const blog = {
  am: {
    title: '“እያዩት ወደሰማይ ዐረገ” (ሉቃ 24÷50 የሐዋ 1÷9)',
    body:
      'የትንሣኤያችን በኩር የሆነው ጌታ በመቃብሩ ቦታ ሥርዓትን እያስተማረ አልፎ አልፎም በግልጥ እየታየ ፍርሐታቸውን እያስወገደ አይሑድ እንደሚሉት ሥጋውንም ደቀመዛሙርቱ እንዳልሰረቁት ይልቁንም በሞት ላይ ሥልጣንኑን አሳይቶ መቃብሩን ባዶ አድርጐ በትንሣኤው አለት ላይ ያቆመን፣ ሞት በእርሱ እንደተሸነፈ የማይታየው እየታየ፣ ዘመን የማይቆጠርለት፣ ዘላለማዊ ጌታ የማይዳሰሰው እየተዳሰሰ ለ40 ቀናት ያኽል ቆይቶ ተከታዮቹን ሐዋርያትን ወደ ቢታንያ አወጣቸው። እያዩት በምስጋና ወደሰማይ ዐረገ።',
  },
  en: {
    title: '“እያዩት ወደሰማይ ዐረገ” (ሉቃ 24÷50 የሐዋ 1÷9)',
    body:
      'የትንሣኤያችን በኩር የሆነው ጌታ በመቃብሩ ቦታ ሥርዓትን እያስተማረ አልፎ አልፎም በግልጥ እየታየ ፍርሐታቸውን እያስወገደ አይሑድ እንደሚሉት ሥጋውንም ደቀመዛሙርቱ እንዳልሰረቁት ይልቁንም በሞት ላይ ሥልጣንኑን አሳይቶ መቃብሩን ባዶ አድርጐ በትንሣኤው አለት ላይ ያቆመን፣ ሞት በእርሱ እንደተሸነፈ የማይታየው እየታየ፣ ዘመን የማይቆጠርለት፣ ዘላለማዊ ጌታ የማይዳሰሰው እየተዳሰሰ ለ40 ቀናት ያኽል ቆይቶ ተከታዮቹን ሐዋርያትን ወደ ቢታንያ አወጣቸው። እያዩት በምስጋና ወደሰማይ ዐረገ።',
  },
  author: 'Melkamu Abate',
  dateStart: '2018-07-19T07:16:09.157Z',
  tag: 'History',
};

export const media = Object.assign({
  am: { body: faker.lorem.paragraphs() },
  en: { body: faker.lorem.paragraphs() },
  title: faker.lorem.words(),
  url: 'https://youtu.be/L42pEhb6NGY',
  mediaType: 'video',
  tag: 'song',
});
