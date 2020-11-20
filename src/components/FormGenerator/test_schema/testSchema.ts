export default {
  properties: {
    someField: {
      dropDown: true,
      fieldType: 'multiObject',
      id: 15,
      items: {
        type: 'object',
        properties: {
          contacts: {
            id: 16,
            name: 'contacts',
            section: true,
            properties: {
              email: {
                id: 18,
                name: 'email',
                title: 'Email',
                type: 'string',
              },
              phone: {
                id: 17,
                name: 'phone',
                title: 'Телефон',
                type: 'string',
              },
            },
            required: [],
            title: 'Персональная инфа',
            type: 'object',
          },
          passport: {
            id: 19,
            name: 'passport',
            section: true,
            properties: {
              number: { id: 21, name: 'number', title: 'Номер', type: 'string' },
              series: { id: 20, name: 'series', title: 'Серия', type: 'string' },
            },
            required: [],
            title: 'Паспорт',
            type: 'object',
          },
        },
      },
      name: 'someField',
      title: 'MultiField',
      type: 'array',
    },
  },
  title: 'Заполните последние данные',
  type: 'object',
};
