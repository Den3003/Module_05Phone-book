import { getStorage } from './modules/serviceStorage.js';
import * as renders from './modules/render.js';
import controls from './modules/control.js';

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

  
