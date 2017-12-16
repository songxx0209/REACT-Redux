import React, { Component } from 'react';
import Gome from '../../components/gome';

class Animal { 
  constructor(name) {
    this.name = name;
  }
  food() {
    console.log(this.name + 'food');
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
// 'Mitzie barks.'
d.speak();
console.dir(Animal);
console.dir(Dog);


// function decorateArmour(target, key, descriptor) {
//   console.log('h', target, 'a', key, 'v', descriptor);
//   const method = descriptor.value;
//   const moreDef = 100;
//   let ret;
//   descriptor.value = (...args) => {
//     args[0] += moreDef;
//     ret = method.apply(target, args);
//     return ret;
//   };
//   return descriptor;
// }

// class Man {
//   constructor(def = 2, atk = 3, hp = 3) {
//     this.init(def, atk, hp);
//   }

//   @decorateArmour
//   init(def, atk, hp) {
//     this.def = def; // 防御值
//     this.atk = atk;  // 攻击力
//     this.hp = hp;  // 血量
//   }
//   toString() {
//     return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
//   }
// }

// let tony = new Man();

// console.log(`当前状态 ===> ${tony}`);


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'one',
    };
  }
  componentWillMount() {
    console.log('will mount');
  }

  componentDidMount() {
    console.log('did mount');
  }

  render() {
    return (
      <div>
        <p>hello world!</p>
        <Gome />
      </div>
    );
  }
}

export default Test;
