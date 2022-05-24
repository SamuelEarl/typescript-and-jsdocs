"use strict";
// // This is an industrial-grade general-purpose greeter function:
// function greet(person: string, date: Date) {
//   console.log(`Hello ${person}, today is ${date.toDateString()}!`);
// }
// greet("Brendan", new Date());
/**
 * @param {string} person
 * @param {Date} date
 */
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Brendan", new Date());
//# sourceMappingURL=hello.js.map