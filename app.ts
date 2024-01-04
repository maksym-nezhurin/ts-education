const button = document.querySelector('input[button]');
const inputNode1 = document.querySelector('#num1');
const inputNode2 = document.querySelector('#num2');

enum Role {
    Admin,
    READ_ONLY = 100,
    AUTHOR
}

function add(n1: number, n2: number) {
    return n1 +n2;
}

add(2, 4);
console.log('I am TS file')

/**
 * TS -> Core Types
 * number
 * string
 * object {age:30}
 * unknown
 * never - function can't return throw Error or throw {}
 * */

class Department {
    name: string;

    constructor(n: string) {
        this.name = n;
    }

    describe() {

    }
}

const acc = new Department('Accounting');
console.log(acc)


