import { removeStorage, setStorage } from "./serviceStorage.js";
import { getStorage } from "./serviceStorage.js";
import { createRow } from "./createElements.js";
import { renderContacts } from "./render.js";

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
    document.querySelectorAll('.delete').forEach(del => {
      if (del.classList.contains('is-visible')) {
        del.classList.remove('is-visible');
      }
    });
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;

    if (target === formOverlay ||
        target.closest('.close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();
      removeStorage(target.closest('.contact').dataset.telnumber);
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    setStorage('phoneBook', newContact);
    form.reset();
    closeModal();
  });
};

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const sortContacts = (tableHead, list, logo) => {
  let toggleBooleanName = true;
  let toggleBooleanSurname = true;
  tableHead.addEventListener('click', e => {
    const target = e.target;
    const dataModify = [...getStorage()];
    const columnDelete = tableHead.querySelector('.th-delete');
    const arrowSpanName = tableHead.querySelector('.js-name-arrow');
    const arrowSpanSurname = tableHead.querySelector('.js-surname-arrow');


    function compareFn(arr, key, clearSpan, addArrow, toggleBoolean) {
      clearSpan.innerHTML = '';
      if (toggleBoolean) {
        addArrow.innerHTML = '&darr;';
      } else {
        addArrow.innerHTML = '&uarr;';
      }

      return arr.sort((a, b) =>
        (toggleBoolean ? a[key].localeCompare(b[key]) :
          b[key].localeCompare(a[key])));
    };

    if (target.closest('.js-tHead-name')) {
      compareFn(
          dataModify,
          'name',
          arrowSpanSurname,
          arrowSpanName,
          toggleBooleanName,
      );
      toggleBooleanName = !toggleBooleanName;
      toggleBooleanSurname = true;
    }

    if (target.closest('.js-tHead-surname')) {
      compareFn(
          dataModify,
          'surname',
          arrowSpanName,
          arrowSpanSurname,
          toggleBooleanSurname,
      );
      toggleBooleanSurname = !toggleBooleanSurname;
      toggleBooleanName = true;
    }

    hoverRow(renderContacts(list, dataModify), logo);
    localStorage.setItem('phoneBook', JSON.stringify(dataModify));

    if (columnDelete.classList.contains('is-visible')) {
      list.querySelectorAll('.td-delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    }
  });
};

export default {
  modalControl,
  deleteControl,
  formControl,
  hoverRow,
  sortContacts,
}
