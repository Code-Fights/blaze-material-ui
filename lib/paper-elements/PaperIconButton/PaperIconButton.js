class PaperIconButton extends BlazeComponent {

  /**
   * set defaults
   */
  onCreated () {
    this.focused = new ReactiveVar(false);
    this.pressed = new ReactiveVar(false);
    this.active = new ReactiveVar(false);
  }

  /**
   * after render
   */
  onRendered () {
    // find the ripples container
    this.ripple = this.childrenComponentsWith('rippleCounter')[0];
  }

  /**
   * handle the focus event
   * 1. not focused while pressed
   */
  onFocus () {
    if (!this.pressed.get()) {
      this.focused.set('');
    }
  };
  /**
   * handle the blur event
   * 1. not focused
   */
  onBlur () {
    this.focused.set(false);
  }

  /**
   * handle the mousedown event
   * 1. pressed
   * 2. active
   * 3. not focused
   * 4. send event to ripple
   * @param  {Event}
   */
  onDown (event) {
    this.pressed.set('');
    this.active.set('');
    this.focused.set(false);
    this.ripple.onDown(event);
  }

  /**
   * handle the mouseup event
   * 1. only if pressed
   * 2. not pressed
   * 3. not active
   * 4. send event to ripple
   * @param  {Event}
   */
  onUp (event) {
    if(this.pressed.get()!==false) {
      this.pressed.set(false);
      this.active.set(false);
      this.ripple.onUp(event);
    }
  }

  /**
   * @return {Object}  The events
   */
  events () {
    return [{
      'blur': this.onBlur,
      'focus': this.onFocus,
      'mousedown': this.onDown,
      'mouseleave': this.onUp,
      'mouseup': this.onUp
    }];
  }
}


PaperIconButton.register('PaperIconButton')
