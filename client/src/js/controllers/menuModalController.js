import model from '../model/model';
import footerRender from '../views/footer-render';

// State
let menus = [];
let activeMenu = [];

// DOM
const $modalContainer = document.querySelector('.menu-modal-container');

// Function
const initialize = () => {
  model
    .getMenu(`/${model.state}`) //
    .then((menu) => {
      menus = menu;
    });
};

const setPrice = (e) => {
  const target = menus.find((menu) => menu.id === +e.target.parentNode.id);

  if (e.target.matches('.btn-size-up')) {
    target.price += target.sizeUpPrice;
    document.querySelector('.modal-price').textContent = `${target.price}원`;
  } else if (e.target.matches('.btn-addshot')) {
    target.price += target.shotPrice;
    document.querySelector('.modal-price').textContent = `${target.price}원`;
  }
  e.target.disabled = true;
};

const setActiveOrder = (e) => {
  const target = {
    ...menus.find((menu) => menu.id === +e.target.parentNode.id),
  };
  target.active = true;
  activeMenu.push(target);
  initialize();
};

// Event

document.addEventListener('DOMContentLoaded', initialize);

$modalContainer.addEventListener('click', (e) => {
  if (e.target.matches('.btn-close')) {
    initialize();
  } else if (e.target.matches('.btn-order')) {
    setActiveOrder(e);
    footerRender(activeMenu);
  } else {
    return setPrice(e);
  }
  $modalContainer.style.display = 'none';
});
