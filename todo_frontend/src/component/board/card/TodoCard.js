import React, { PropTypes } from 'react';

const galPng = require('../../../assets/images/gal.png');
const delPng = require('../../../assets/images/del.png');


const Card = (props) => {
  const { style, item, key, x, y, deleteTodo } = props;


  return (
    <div style={style} className="item" id={style ? item.id : null}>
      <div className="item-name">{item.title}</div>
      <div className="item-container">
        <div className="item-content">
          <p>{item.text}</p>
        </div>
      </div>
      <div className="item-perfomers">
        <div className="add-perfomers">
          <a onClick={deleteTodo}><img src={delPng} alt="Delete perfomers" /></a>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object,
  deleteTodo: PropTypes.func
};

export default Card;
