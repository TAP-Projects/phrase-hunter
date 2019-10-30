// Today I learned that getters and setters are awesome

// What are they? Getters and setters allow you to get and set dynamically computed properties of objects or classes. Below, I've got a nice class that takes a first and last name and stores them. But what if I want the fullName? I have a couple of options. 
// 1. I could pass fullName to the class constructor function as a parameter. But that's a pain in the butt and also increases the chance that I'll make a mistake while typing in that full name string.
// 2. I could write a method that constructs the fullName and then call personInstance.fullName(). But there's a big drawback, which is that fullName is not writable. I can't add a fullName like this: personInstance.fullName = 'Bob Bobbert'
// Getters and setters to the rescue!

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    // A setter method takes one argument. You can call it whatever you want, but the convention is to call the method and the value the same thing.    
    set fullName(fullName) {
        // _fullName is called a "backing property." Later on, when I get the properties of my person instance, I'll be able to tell at a glance that _fullName is a computed property.
        this._fullName = fullName;
        var words = this._fullName.toString().split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    }
}

// Let's instantiate an instance of Person without any parameters
const ben = new Person();

// Now we'll use our setter to set the full name. Note that we're using dot notation. You're not calling a function, e.g. ben.fullName('Ben Franklin').

ben.fullName = 'Ben Franklin';

// Now we can get not just the full name, but the first and last name too!
console.log(ben.fullName) // => 'Ben Franklin'
console.log(ben.firstName); // => 'Ben'
console.log(ben.lastName) // => 'Franklin'

// By setting the fullName, you also set the firstName and lastName properties. 

// Now let's create a person with first and last name parameters and get the computed fullName property.

const julian = new Person('Julian', 'Johannesen');

console.log(julian.fullName);

// There's another way to do this by using Object.defineProperty like this;
Object.defineProperty(Person.prototype, 'fullName', {
    get: function () {
        return firstName + ' ' + lastName;
    },
    set: function (name) {
        var words = name.split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    },
    // Here we're saying that this property's properties can be altered. This option is false by default.
    configurable: true,
    // Here we're saying that you can use for...in or Object.keys() to list this property. This is also false by default.
    enumerable: true
});

// Notice that you need to use Object.defineProperty on the target object's prototype - Person.prototype

// Above, the 1st param is the object, the 2nd param is the property name, the 3rd param is an object with the getter and setter defined as methods.

const spiderMan = new Person();
spiderMan.fullName = 'Peter Parker';
console.log(spiderMan.firstName); // => 'Julian'

// If you want each instance to have its own property, then you can use Object.defineProperty() from inside the class's constructor function, like this:

class Person2 {
    constructor(name) {
        this.name = name;
        // Notice that the first argument is 'this'
        Object.defineProperty(this, 'firstName', {
            get: function () {
                return this.name.split(' ')[0] || '';
            },
            set: function (firstName) {
                this.firstName = firstName;
            }
        });
        // You can use this method to create data properties without using getters and setters like this:
        Object.defineProperty(this, 'age', {
            value: 18,
            writable: true,
            configurable: true,
            enumerable: true
        });
    }
}

// If a value is set, then you can't use the accessors get and set. It's one or the other, not both. Also, unless you specify that this property is writable, nothing will be able to modify it. E.g. julian.age = 99 will do nothing.

const superman = new Person2('Clark Kent');
console.log(superman.firstName);
console.log(superman.age);

// Here's the circle example
class Circle {
    constructor(circumference, area) {
        this.circumference = circumference;
        this.area = area;
    }

    get radius() {
        return this.circumference / (2 * Math.PI) ||
            Math.sqrt(this.area / Math.PI);
    }

    // A setter method takes one argument. You can call it whatever you want, but the convention is to call the method and the value the same thing
    set radius(radius) {
        // _radius is called a 'backing property.' I think the underscore signifies that this is a computed property, and not a property passed as a parameter
        this._radius = radius;
        this.circumference = 2 * Math.PI * this._radius;
        this.area = Math.PI * Math.pow(this._radius, 2);
    }
}

const circ = new Circle();
circ.radius = 5;
console.log(circ.radius);
console.log(circ.circumference);
console.log(circ.area);
console.log(circ);