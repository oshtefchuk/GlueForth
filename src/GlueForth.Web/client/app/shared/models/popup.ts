export class Popup {
  width = '200';
  height = null;
  showTitle = true;
  title = '';
  dragEnabled = true;
  closeOnOutsideClick = true;
  closeOnBackButton = true;
  showCloseButton = true;
  isVisible = true;
  shading = true;
  resizeEnabled = true;
  template = '';

  constructor(
  width?: string,
  height?: number,
  showTitle?: boolean,
  title?: string,
  dragEnabled?: boolean,
  closeOnOutsideClick?: boolean,
  closeOnBackButton?: boolean,
  showCloseButton?: boolean,
  isVisible?: boolean,
  shading?: boolean,
  resizeEnabled?: boolean,
  template?: string
  ) {
    this.width = width;
    this.title = title;
    this.height = height;
    this.showTitle = showTitle;
    this.dragEnabled = dragEnabled;
    this.closeOnOutsideClick = closeOnOutsideClick;
    this.closeOnBackButton = closeOnBackButton;
    this.showCloseButton = showCloseButton;
    this.isVisible = isVisible;
    this.shading = shading;
    this.resizeEnabled = resizeEnabled;
    this.template = template;
  }


}
