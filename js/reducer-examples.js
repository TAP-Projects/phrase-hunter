//I've been working my way through Treehouse's Full Stack JavaScript Techdegree curriculum and I recently came across their material on reduce(). I've studied reduce() before, but what I learned didn't really stick. Treehouse's material on this subject is great, and I recommend that you check it out. For the TLDR version, read on!

//NOTE: You should probably have some familiarity with JavaScript's higher order array methods, if you're going to get much out of this article.

//reduce() is similar to JavaScript's other higher order array methods like forEach() or map() in that its first parameter is a callback function. reduce() also has a second optional parameter. More on that in a sec. 

//The callback functions used by most higher order array methods are pretty straightforward. All of them take as parameters the current value, the current index, and a couple of optional parameters that we don't have to worry about. reduce() is a bit different. reduce()'s callback takes as parameters an 'accumulator,' the current value, and, again, a couple optional parameters that we don't have to worry about.

//What the heck is an accumulator? Okay. This is really cool. The accumulator is the returned value of the previous iteration of the loop. 

//"Your reducer function's returned value is assigned to the accumulator, whose value is remembered across each iteration throughout the array and ultimately becomes the final, single resulting value." - MDN entry for reduce()

//Hold on a second though. What is the accumulator's value on the first iteration? Nothing has been returned from the callback function yet. Is it just 'null'? Nope. By default, the accumulator will take on the fist value of the array we're iterating over. However, you can also specify the initial value of the accumulator in that second parameter to reduce() that I mentioned above. That comes in really handy, as you'll see in a bit.

//Let's look at a simple problem. Say you need to multiply each member of an array by 2, adding the results of each operation to the previous operation and returning the final result. 

//Using a for loop, you might do it this way:

// Here's our array
const nums = [5,2,3];
// This is a holder for our result
let sum = 0;
for(let i = 0; i < nums.length; i++){
    sum += nums[i] * 2;
}
console.log(sum); //=> 20

// Now let's try it using reduce, using the sum variable we created above:

// Here's our callback function. The first parameter
// is our accumulator, the 2nd is our value.
const myReducer = (a, v) => a += 2 * v;
// If you're following along in a code playground 
// or your console, make sure you reset sum to 0.
sum = 0;
// Now set sum equal to result of nums.reduce().
// We also need to include that 2nd parameter to
// reduce(). We're using 0 to indicate that we
// want to begin counting from 0.
sum = nums.reduce( myReducer, 0 );
console.log(sum); //=> 20

//Cool, right?! Let's walk through it, iteration by iteration. 

// Entering our first iteration, the accumulator's takes on the value we set when we called reduce(). In this case, that's 0. In the body of our 'reducer' function, the accumulator is set to the current value of the accumulator (0) plus the product of the first member of the array (5) and 2. We can express it this way 0 + (5*2) = 10. And that's what our reducer function returns.

// Entering our second iteration, the accumulator's value is now 10! In the body of our reducer function, the accumulator is once again set to the current value of the accumulator (10) plus the product of the _second_ member of the array (2) and 2. We can express it this way 10 + (2*2) = 14. And that's what our reducer function returns. 

// Entering the third and final iteration, the accumulator's value is now 14! In the body of our reducer function, the accumulator is once again set to the current value of the accumulator (14) plus the product of the _third_ member of the array (3) and 2. We can express it this way 14 + (3*2) = 20. And that's what our reducer function returns. 

// reduce() receives the reducer's returned value and returns it in turn.

//Here's another problem. Given an array of phone numbers, find the number of phone numbers that begin with '5'.

const phoneNumbers = ["(503) 123-4567", "(646) 123-4567", "(503) 987-6543", "(503) 234-5678", "(212) 123-4567", "(416) 123-4567"];

// Take a moment to see if you can figure it out.

// Here's the solution:

// First, we're going to set up a variable called numberOf503 to hold whatever gets returned by phoneNumbers.reduce(). For the reducer, we have the accumulator and the current value getting passed in. Then we check to see if the current value begin with the number 5. If it does, we increment the accumulator by 1. Then we return the accumulator. As reduce() iterates over the phone numbers in our original array, every time it encounters one that begins with '5' it adds 1 to the accumulator and sort of passes the accumulator off to the next iteration.

const myReducer2 = (a, v) => {
    console.log('The accumulator and value are: ', a, v)
    if(v.charAt(1) === '5'){
        return a += 1;
    } else {
        return a
    }
}
const result = phoneNumbers.reduce( myReducer2, 0 );
console.log(result); //=> 3

// The Array reduce method can be used with complex values, not just numbers

const users = [
    { name: 'asdf', age: 33 },
    { name: 'asldkfk', age: 99 },
    { name: 'dd', age: 88 }
];

// I've created a new usersObject, which I also pass in as the 'accumulator' in users.reduce(). The 'current value' in the reducer is the user object that I'm iterating over. In the body of the reducer, the accumulator is the usersObject at a new key called 'user.name'. We set that equal to user.age. Then we return the accumulator, that is, usersObject. We have to return the object so that it's available in the next iteration. We also pass in a new empty object literal as the initial value of the accumulator.
let usersObject = users.reduce((usersObject, user) => {
    usersObject[user.name] = user.age
    return usersObject;
}, {});

console.log(usersObject);

// A simpler example. Find the most expensive item that is under $10 and return that object.

const products = [
    { name: 'hard drive', price: 59.99 },
    { name: 'lighbulbs', price: 2.59 },
    { name: 'paper towels', price: 6.99 },
    { name: 'flatscreen monitor', price: 159.99 },
    { name: 'cable ties', price: 19.99 },
    { name: 'ballpoint pens', price: 4.49 }
];

// Result: { name: 'paper towels', price: 6.99 }
//let product = products
//     .filter( item => item.price < 10.01 )
//     .reduce( (obj, product) => {
//         if(obj.price > product.price){
//             return obj
//         }
//     },0);

// console.log(obj);