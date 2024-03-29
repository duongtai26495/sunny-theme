document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll('.list-menu-item > .list-menu-empty');
  
    menuLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
  
        const iconCaret = link.querySelector('.icon-caret');
        const listItem = link.closest('.list-menu-item');
        const submenu = listItem.querySelector('.list-submenu');
        const isOpen = submenu.hasAttribute('open');
  
        const allCaretIcons = document.querySelectorAll('.list-menu-item > .list-menu-empty .icon-caret.rotate-180');
        const allSubmenus = document.querySelectorAll('.list-submenu[open]');
  
        allSubmenus.forEach((otherSubmenu) => {
          otherSubmenu.removeAttribute('open');
          
          otherSubmenu.addEventListener('focusout', () => {
            otherSubmenu.removeAttribute('open');
            iconCaret.classList.remove('rotate-180');
            listItem.classList.remove('submenu-open');
          });
        });
  
        allCaretIcons.forEach((otherIcon) => {
          otherIcon.classList.remove('rotate-180');
        });
        
        if (!isOpen) {
          submenu.setAttribute('open', '');
          link.classList.add('submenu-open');
          iconCaret.classList.add('rotate-180');
         
          submenu.addEventListener('focusout', () => {
            submenu.removeAttribute('open');
            link.classList.remove('submenu-open');
            iconCaret.classList.remove('rotate-180');
          });
        } else {
          submenu.removeAttribute('open');
          link.classList.remove('submenu-open');
          iconCaret.classList.remove('rotate-180');
        }
      });
    });
  
    if (!customElements.get('localization-form')) {
      customElements.define(
        'localization-form',
        class LocalizationForm extends HTMLElement {
          constructor() {
            super();
            this.elements = {
              input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
              button: this.querySelector('button'),
              panel: this.querySelector('.disclosure__list-wrapper'),
            };
            this.elements.button.addEventListener('click', this.openSelector.bind(this));
            this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
            this.addEventListener('keyup', this.onContainerKeyUp.bind(this));
    
            this.querySelectorAll('a').forEach((item) => item.addEventListener('click', this.onItemClick.bind(this)));
          }
    
          hidePanel() {
            this.elements.button.setAttribute('aria-expanded', 'false');
            this.elements.panel.setAttribute('hidden', true);
          }
    
          onContainerKeyUp(event) {
            if (event.code.toUpperCase() !== 'ESCAPE') return;
    
            if (this.elements.button.getAttribute('aria-expanded') == 'false') return;
            this.hidePanel();
            event.stopPropagation();
            this.elements.button.focus();
          }
    
          onItemClick(event) {
            event.preventDefault();
            const form = this.querySelector('form');
            this.elements.input.value = event.currentTarget.dataset.value;
            if (form) form.submit();
          }
    
          openSelector() {
            this.elements.button.focus();
            this.elements.panel.toggleAttribute('hidden');
            this.elements.button.setAttribute(
              'aria-expanded',
              (this.elements.button.getAttribute('aria-expanded') === 'false').toString()
            );
          }
    
          closeSelector(event) {
            const isChild =
              this.elements.panel.contains(event.relatedTarget) || this.elements.button.contains(event.relatedTarget);
            if (!event.relatedTarget || !isChild) {
              this.hidePanel();
            }
          }
        }
      );
    }
  
    const mobileMenuButton = document.querySelector("button.menu-mobile-button");
    const mobileMenuDrawer = document.querySelector(".mobile-menu-drawer");
    mobileMenuButton.addEventListener('click', () => {
      mobileMenuButton.toggleAttribute('open');
      mobileMenuDrawer.toggleAttribute('open');
    });
  
    document.addEventListener('click', (event) => {
      const isClickInsideMenuDrawer = mobileMenuDrawer.contains(event.target);
      const isClickOnMenuButton = mobileMenuButton.contains(event.target);
      if (!isClickInsideMenuDrawer && !isClickOnMenuButton) {
        mobileMenuDrawer.removeAttribute('open');
        mobileMenuButton.removeAttribute('open');
      }
    });
  
    const cartDrawerButtons = document.querySelectorAll(".cart-drawer-btn");
    const cartDrawer = document.querySelector(".cart-drawer");
  
    function handleCartDrawerButtonClick(event) {
      event.stopPropagation();
      cartDrawer.toggleAttribute('open');
      if (!cartDrawer.hasAttribute('open')) {
        cartDrawer.focus();
      }
    }
  
    const cartDrawerButtonsArray = Array.from(cartDrawerButtons);
  
    cartDrawerButtonsArray.forEach((cartDrawerButton) => {
      cartDrawerButton.addEventListener('click', () => {  
        cartDrawer.toggleAttribute('open');
        if (!cartDrawer.hasAttribute('open')) {
          cartDrawer.focus();
        }
      });
    });
  
    document.addEventListener('click', (event) => {
      const isClickInsideCartDrawer = cartDrawer.contains(event.target);
      const isClickOnCartButton = cartDrawerButtonsArray.some((btn) => btn.contains(event.target));
  
      if (!isClickInsideCartDrawer && !isClickOnCartButton) {
        cartDrawer.removeAttribute('open');
      }
    });
  });
  