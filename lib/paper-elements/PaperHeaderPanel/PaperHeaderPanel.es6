class PaperHeaderPanel extends BlazeComponent {

  /**
   * set defaults
   */
  onCreated () {
    this.paperHeaderClass = new ReactiveVar('paper-header');
    this.mode = new ReactiveVar(this.data().mode || 'standard');
    this.dynamicShadow = ['waterfall', 'waterfall-tall'];
    this.staticShadow = ['standard'];
  }

  onRendered(){
    this.mainContainer = this.find('[data-id="mainContainer"]');
    this.header = this.find('paper-toolbar') || this.find('.paper-header');
    let staticShadow = this.staticShadow.indexOf(this.mode.get()) > -1;

    if(staticShadow) {
      this.addShadow();
    }
    if(this.mode.get() === 'waterfall-tall') {
      this.header.classList.add('medium-tall');
    }
  }

  addShadow () {
    if (!this.header){
      return false;
    }
    this.header.classList.add('has-shadow');
  }

  removeShadow () {
    if (!this.header){
      return false;
    }
    this.header.classList.remove('has-shadow');
  }

  handleScroll(){
    if (this.mainContainer && this.mainContainer.scrollTop) {
      let scrollTop = this.mainContainer.scrollTop;
      let dynamicShadow = this.dynamicShadow.indexOf(this.mode.get()) > -1;
      if(scrollTop > 0 && dynamicShadow) {
        this.addShadow();
      } else if (dynamicShadow) {
        this.removeShadow();
      }
      if(scrollTop > 0 && this.mode.get() === 'waterfall-tall') {
        this.header.classList.remove('medium-tall');
      } else if(scrollTop <= 0 && this.mode.get() === 'waterfall-tall') {
        this.header.classList.add('medium-tall');
      }
    }
  }

  events(){
    return [{
      'scroll': this.handleScroll
    }]
  }
}

PaperHeaderPanel.register('PaperHeaderPanel');