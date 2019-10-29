// Today I learned that getters and 
// setters are awesome

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    set fullName(name) {
        var words = name.toString().split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    }
}

// Let's instantiate an instance 
// of Person without any parameters
const ben = new Person();

// Now set the full name. Note 
// that you're noy calling a function
// explicitly e.g. 
// ben.fullName('Ben Franklin').

ben.fullName = 'Ben Franklin';

// And watch the magic happen
console.log(ben.firstName); // => Ben
console.log(ben.lastName) // => Franklin

// By setting the fullName, you also
// set the firstName and lastName 
// properties.

// Or create a person with first and 
// last name parameters and get the
// fullName property

const julian = new Person('Julian', 'Johannesen');

console.log(julian.fullName);

// There's another way to do this by
// using Object.defineProperty like this;
Object.defineProperty(Person.prototype, 'fullName', {
    get: function () {
        return firstName + ' ' + lastName;
    },
    set: function (name) {
        var words = name.split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    },
    configurable: true,
    enumerable: true
});

// Note that you need to defineProperty
// on the target objects prototype

// Above, the 1st param is the object,
// the 2nd param is the property name,
// the 3rd param is an object with
// the getter and setter defined as
// methods.

// configurable and enumerable are false
// by default. You need to set them to 
// true.

const spiderMan = new Person();
spiderMan.fullName = 'Peter Parker';
console.log(spiderMan.firstName); // => 'Julian'

// If you want each instance to have its
// own property, then you can use Object.
// defineProperty() from inside the class

class Person2 {
    constructor(name) {
        this.name = name;
        Object.defineProperty(this, 'firstName', {
            get: function () {
                return this.name.split(' ')[0] || '';
            },
            set: function (firstName) {
                this.firstName = firstName;
            }
        });
        // You can use this method to create
        // data properties without using
        // getters and setters like this:
        Object.defineProperty(this, 'age', {
            value: 18,
            writable: true,
            configurable: true,
            enumerable: true
        });
    }
}

// If a value is set, then you can't
// use accessors like get and set.
// It's one or the other, not both.
// Also, unless you specify that this
// property is writable, nothing will
// be able to modify it. E.g. 
// julian.age = 99 will do nothing.

const superman = new Person2('Clark Kent');
console.log(superman.firstName)
console.log(superman.age)
