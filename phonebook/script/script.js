'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
  const createContainer = () => {
    const container = document.createElement('div');

    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    const headerContainer = createContainer();

    header.classList.add('header');
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');

    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();

    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');

    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');

      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.classList.add('table', 'table-striped');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
        <th></th>
      </tr>
    `);
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    const form = document.createElement('form');

    overlay.classList.add('form-overlay');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" id="surname" 
          type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" id="phone" 
          type="number" required>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    const footerContainer = createContainer();

    footer.classList.add('footer');
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    return footer;
  };

  const createFooterText = title => {
    const p = document.createElement('p');

    p.insertAdjacentHTML('beforeend', `Все права защищены &copy;${title}`);

    return p;
  };


  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const form = createForm();
    const footer = createFooter();
    const footerText = createFooterText(title);


    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);
    footer.footerContainer.append(footerText);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    const tdDel = document.createElement('td');
    const buttonDel = document.createElement('button');
    const tdName = document.createElement('td');
    const tdSurname = document.createElement('td');
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    const tdModify = document.createElement('td');

    tdName.textContent = firstName;
    tdSurname.textContent = surname;
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    tdDel.classList.add('delete');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    tdModify.insertAdjacentHTML('beforeend', `
      <svg class="create-number-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5629 4.86078L17.6394 6.93629L15.5629 4.86078ZM16.8982 
          3.03233L11.2834 8.64709C10.9933 8.9368 10.7955 9.3059 10.7148 
          9.70789L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629 
          11.5069 13.8531 11.2167L19.4678 5.60196C19.6366 5.43324 19.7704 
          5.23293 19.8617 5.01248C19.953 4.79203 20 4.55576 20 4.31714C20 
          4.07853 19.953 3.84225 19.8617 3.6218C19.7704 3.40136 19.6366 
          3.20105 19.4678 3.03233C19.2991 2.8636 19.0988 2.72976 18.8784 
          2.63845C18.6579 2.54714 18.4216 2.50014 18.183 2.50014C17.9444 
          2.50014 17.7081 2.54714 17.4877 2.63845C17.2672 2.72976 17.0669 
          2.8636 16.8982 3.03233V3.03233Z" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        />
        <path d="M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 
          17.4651 18.5925C17.0973 18.9602 16.5986 19.1668 16.0786 
          19.1668H5.29415C4.77411 19.1668 4.27537 18.9602 3.90765 
          18.5925C3.53993 18.2248 3.33334 17.726 3.33334 
          17.206V6.42157C3.33334 5.90154 3.53993 5.4028 3.90765 
          5.03508C4.27537 4.66735 4.77411 4.46077 5.29415 4.46077H8.23535" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
    `);
    tr.append(tdDel, tdName, tdSurname, tdPhone, tdModify);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
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

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);
    const {list, logo, btnAdd, formOverlay, form} = phoneBook;

    // Фукционал

    const allRow = renderContacts(list, data);

    hoverRow(allRow, logo);

    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    form.addEventListener('click', event => {
      event.stopPropagation();
    });

    formOverlay.addEventListener('click', () => {
      formOverlay.classList.remove('is-visible');
    });
  };

  window.phoneBookInit = init;
}
