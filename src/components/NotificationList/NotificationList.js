import React, { useState, useEffect } from 'react';

import './NotificationList.css';
import { WithServices } from '../hos';
import NotificationListItem from '../NotificationListItem';

const NotificationList = ({ services: { getNotificationList, deleteItemFromList } }) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    getNotificationList()
      .then(items => {
        setItems(items)
      })
  }, [getNotificationList])

  const deleteItem = id => {
    deleteItemFromList(id);
    getNotificationList()
      .then(items => {
        setItems(items)
      })
  }

  return (
    <ul className='notifications__list'>
      {items.map(item =>
        <NotificationListItem key={item.id} item={item} deleteItem={deleteItem} />)}
    </ul>
  )
}

export default WithServices(NotificationList);