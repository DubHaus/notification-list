import React, { useState } from 'react';

import './NotificationListItem.css';
import closeIcon from '../../assets/img/close-icon.svg';

const NotificationListItem = ({ item, deleteItem }) => {

  const [startPos, setStartPos] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
  const [offsetItem, setOffsetItem] = useState(0);
  const [endOffset, setEndOffset] = useState(0);

  const [buttonAnimation, setButtonAnimation] = useState('');
  const [listSwipeAnimation, setListSwipeAnimation] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const itemDeleteAnimation = item.type === 'list' ?
    isDelete ?
      {
        animationName: 'item-delete-animation',
        marginBottom: '0px',
        height: '0px'
      }
      :
      {
        animationName: '',
        marginBottom: '15px',
        height: isListOpen ? `${(item.data.length + 1) * 91.25}px` : '95px',
      }
    :
    isDelete ?
      {
        animationName: 'item-delete-animation',
        marginBottom: '0px',
        height: '0px'
      } :
      {
        animationName: '',
        marginBottom: '15px',
        height: '80px'
      }

  const onStartSwipe = e => {
    if (e.touches) {
      setStartPos(e.touches[0].clientX)
    } else {
      e.preventDefault();
      setStartPos(e.clientX)
    }

  }

  const onSwipe = e => {
    if (e.buttons && e.buttons > 0) {
      e.preventDefault();
      if (isFastSwipe(e.clientX)) {
        makeEndAnimation(e.clientX);
      } else {
        doUsualSwipe(e.clientX);
      }
    } else if (e.touches) {
      if (e.touches && isFastSwipe(e.touches[0].clientX)) {
        makeEndAnimation(e.touches[0].clientX);
      } else {
        doUsualSwipe(e.touches[0].clientX);
      }
    }

  }

  const doUsualSwipe = current => {
    setCurrentPos(current);

    if (wasSwipeBefore() && isNotCrossBorder(endOffset)) {
      setOffsetItem(endOffset + (startPos - currentPos))

    } else if (currentPos && isNotCrossBorder()) {
      setOffsetItem(startPos - currentPos);
    }
  }

  const isNotCrossBorder = (endOffset = 0) => endOffset + (startPos - currentPos) < 100;

  const wasSwipeBefore = () => endOffset;

  const isFastSwipe = (newPossition) => {
    return (
      currentPos && ((currentPos > newPossition + 3) ||
        (currentPos < newPossition - 3))
    )
  }

  const makeEndAnimation = newPossition => {
    if (currentPos === newPossition) {
      if (!listSwipeAnimation) {
        setListSwipeAnimation('list-animation');
      }
      if (listSwipeAnimation) {
        setListSwipeAnimation('')
      }
    }

    if (currentPos > newPossition) {
      setOffsetItem(100);
    } else if (currentPos < newPossition) {
      setOffsetItem(0)
    } else if (currentPos === newPossition) {
      setOffsetItem(offsetItem > 51 ? 100 : 0)
    }
  }

  const onEndSwipe = () => {
    if (isNotClick()) {
      makeEndAnimation(currentPos)
      setStartPos(0);
      setCurrentPos(0);
      setEndOffset(offsetItem);
      setButtonAnimation('show-delete_btn-animation');
      setTimeout(cleanAnimations, 800)
    }
  }

  const cleanAnimations = () => {
    setButtonAnimation('');
  }

  const isNotClick = () => currentPos;

  const onItemsClick = e => {
    if (item.type === 'list' && !offsetItem && startPos) {
      setIsListOpen(true);
    }
  }

  const onDeleteitem = () => {
    animateDelete();
    setTimeout(() => {
      deleteItem(item.id);
    }, 700)
  }

  const animateDelete = () => setIsDelete(true);

  return (
    <li
      style={{
        ...itemDeleteAnimation
      }}
      onClick={onItemsClick}
      className={
        `notifications__list_item 
        ${!isListOpen && item.type}
        ${listSwipeAnimation}`}
    >
      <div
        onTouchStart={onStartSwipe}
        onTouchMove={onSwipe}
        onTouchEnd={onEndSwipe}
        onMouseDown={onStartSwipe}
        onMouseMove={onSwipe}
        onMouseUp={onEndSwipe}
        style={{
          transform: `translateX(-${offsetItem}px)`
        }}
        className='notifications__list_item__wrap'>
        <div className='notifications__list_item__descr'>
          <i className='notifications__list_item__photo'>
            <img src={item.photo} alt='icon' />
          </i>
          <p>{item.text}</p>
        </div>
        <button onClick={onDeleteitem} className={`delete_btn ${buttonAnimation}`}>
          <img src={closeIcon} alt='icon' />
        </button>
      </div>
      {item.type === 'list' &&
        <ul className='notifications__list_item__items'>
          {item.data.map(item => (
            <NotificationListItem
              deleteItem={deleteItem}
              key={item.id}
              item={item} />
          ))}
        </ul>
      }
    </li >
  )
}


export default NotificationListItem;