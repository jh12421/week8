class Warrior {
  //initialize warrior with a name and a weapon.
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
   //this method decribes the warrior.
  describe() {
    return `${this.name} wields ${this.weapon}.`;
  }
}

class Empire {
   //initialize the empire and the empty array to store warriors. 
  constructor(name) {
    this.name = name;
    this.warriors = [];
  }

   //method will add a warrior to an empire.
  addWarrior(warrior) {
    if (warrior instanceof Warrior) {//check if argument passed is a warrior.
      this.warriors.push(warrior);//add warrior to empire.
    } else {//if not throw an error.
      throw new Error(`You can only add an instance of Warrior. Argument is not a warrior: ${warrior}`);
    }
  }
   //will describe the empire and the number of warriors. 
  describe() {
    return `${this.name} has ${this.warriors.length} warriors.`;
  }
}

class Menu {
  constructor() {
    this.empires = [];//array will store empires.
    this.selectedEmpire = null;
  }

  start() {
    let selection = this.showMainMenuOptions(); //display main menu option and allow user to select.
    while (selection != 0) {
      switch(selection) {
        case '1':
          this.createEmpire();
          break;
        case '2':
          this.viewEmpire();
          break;
        case '3':
          this.deleteEmpire();
          break;
        case '4':
          this.displayEmpires();
          break;
        default:
          selection = 0;//exit loop if invalid option is chosen.
      }
      selection = this.showMainMenuOptions();
    }
    alert('Goodbye!');
  }
    // display main menu and get user to selection.
  showMainMenuOptions() {
    return prompt(`
      0) exit
      1) create a new empire
      2) view an empire
      3) delete an empire
      4) display all empires
    `);
  }
    // display options for chosen empire.
  showEmpireMenuOptions(empireInfo) {
    return prompt(`
      0) back
      1) add a new warrior
      2) delete a warrior
      -----------------
      ${empireInfo}
    `);
  }
    //displays all empires.
  displayEmpires() {
    let empireString = '';
    for (let i = 0; i < this.empires.length; i++) {
      empireString += i + ') ' + this.empires[i].name + '\n';
    }
    alert(empireString);//displays list of empires.
  }

  createEmpire() {
    let name = prompt('Enter name for new empire: ');
    this.empires.push(new Empire(name));
  }
    //method lets you view details of existing empire.
  viewEmpire() {
    let index = prompt("Enter the index of the empire that you want to view:");
    if (index > -1 && index < this.empires.length) {
      this.selectedEmpire = this.empires[index];
      let description = 'Empire Name: ' + this.selectedEmpire.name + '\n';
      description += ' ' + this.selectedEmpire.describe() + '\n ';
      for (let i = 0; i < this.selectedEmpire.warriors.length; i++) {
        description += i + ') ' + this.selectedEmpire.warriors[i].describe() + '\n';
      }
      let selection1 = this.showEmpireMenuOptions(description);
      switch (selection1) {
        case '1':
          this.createWarrior();//add warrior.
          break;
        case '2':
          this.deleteWarrior();//delete warrior.
          break;
      }
    }
  }
    //method to delete existing empire.
  deleteEmpire() {
    let index = prompt('Enter the index of the empire that you wish to delete: ');
    if (index > -1 && index < this.empires.length) {
      this.empires.splice(index, 1);
    }
  }
    //create new warrior and add to selected empire.
  createWarrior() {
    let name = prompt('Enter name for new warrior: ');
    let weapon = prompt('Enter weapon for new warrior: ');
    this.selectedEmpire.addWarrior(new Warrior(name, weapon));
  }
    //delete warrior from selected empire.
  deleteWarrior() {
    let index = prompt('Enter the index of the warrior that you wish to delete: ');
    if (index > -1 && index < this.selectedEmpire.warriors.length) { 
      this.selectedEmpire.warriors.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();
