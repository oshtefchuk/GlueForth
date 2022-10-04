export class FormValidation {

   constructor(){}

  public passwordComparison = (form) => {
    return form.instance.option('formData').Password;
  };

  public getPhoneRules(): any {
    let phoneRules =  {X: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/};
    return phoneRules;
  }

  public getPhonePattern(): any {
    let phonePattern = /^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/;
    return phonePattern;
  }

  public getCellPhonePattern(): any {
    let phonePattern = /^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/;
    return phonePattern;
  }

  public getCityPattern(): string {
    let cityPattern = '^[^0-9]+$';
    return cityPattern;
  }
  public getNamePattern() {
    let namePattern = /^[^0-9]+$/;
    return namePattern;
  }
  public getEmailPattern(): any {
    let emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailPattern;
  }
  public passwordUpdateCompartionOld = (form) => {
    return form.instance.option('formData').OldPassword;
  };
}
