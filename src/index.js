import { getStorage } from './script/serviceStorage.js';
import * as renders from './script/render.js';
import controls from './script/control.js';

// import './css/normalize.css';
// import './css/bootstrap.css';
// import './css/style.css';
import './index.html'
import './scss/index.scss';

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
      tableHead,
    } = renders.renderPhoneBook(app, title);

    // Фукционал

    renders.renderContacts(list, getStorage());
    const {closeModal} = controls.modalControl(btnAdd, formOverlay);

    controls.hoverRow(renders.renderContacts(list, getStorage()), logo);
    controls.deleteControl(btnDel, list);
    controls.sortContacts(tableHead, list, logo);
    controls.formControl(form, list, closeModal);
  };

  init('#app', 'Денис');

  
