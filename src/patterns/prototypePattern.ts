interface Prototype<T> {
    clone(): T;
}

class UserHistory implements Prototype<UserHistory> {
    createdAt: Date;

    constructor(public email: string, public name: string) {
        this.createdAt = new Date();
    }

    clone():UserHistory {
        let target = new UserHistory(this.email, this.name);
        target.createdAt = this.createdAt;
        return target;
    }
}

let user = new UserHistory('a@a.ua', 'Anton');
console.log(user);
let user2 = user.clone();
user2.email = 'new@e.ri';
console.log(user2)