export default class {
  notificationList = [
    {
      type: 'item',
      id: 1,
      text: 'Jake invited you to the DSM for ChatApp',
      photo: './assets/img/photo_1.svg',
      date: '12:23 am',
    },
    {
      type: 'list',
      id: 2,
      text: 'Mike sent you messages',
      photo: './assets/img/photo_2.svg',
      date: '10:15 pm',
      data: [
        {
          type: 'item',
          id: 3,
          text: 'Hello dude, can you send me a homework',
          photo: './assets/img/photo_2.svg',
          date: '9:20 pm',
        },
        {
          type: 'item',
          id: 4,
          text: 'I hope you read this today :d',
          photo: './assets/img/photo_2.svg',
          date: '9:43 pm',
        },
        {
          type: 'item',
          id: 5,
          text: 'Dont worry about me, Sandy sent me homework. Bye',
          photo: './assets/img/photo_2.svg',
          date: '10:15 pm',
        },
      ]
    },
    {
      type: 'item',
      id: 10,
      text: 'Sara make a new task in Brand Design',
      photo: './assets/img/photo_3.svg',
      date: '11:02 pm',
    },
    {
      type: 'item',
      id: 11,
      text: 'Sara make a new task in Brand Design',
      photo: './assets/img/photo_3.svg',
      date: '11:02 pm',
    },
    {
      type: 'item',
      id: 12,
      text: 'Sara make a new task in Brand Design',
      photo: './assets/img/photo_3.svg',
      date: '11:02 pm',
    },
    {
      type: 'item',
      id: 13,
      text: 'Sara make a new task in Brand Design',
      photo: './assets/img/photo_3.svg',
      date: '11:02 pm',
    },
  ]


  getNotificationList = () => new Promise(resolve => {
    resolve(this.notificationList)
  });

  deleteItemFromList = id => {
    const { notificationList } = this;
    let idx = notificationList.findIndex(item => item.id === id);
    if (idx !== -1) {
      this.notificationList =
        [...notificationList.slice(0, idx),
        ...notificationList.slice(idx + 1)]
    } else {
      let item = notificationList.filter(item => item.type === 'list')
        .filter(item => item.data.find(item => item.id === id))[0];
      const itemId = notificationList.indexOf(item);
      const dataIdx = item.data.findIndex(item => item.id === id);
      item.data = [
        ...item.data.slice(0, dataIdx),
        ...item.data.slice(dataIdx + 1)
      ]
      this.notificationList = [
        ...notificationList.slice(0, itemId),
        item,
        ...notificationList.slice(itemId + 1)
      ]
    }
  }
}
