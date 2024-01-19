// Good for Auth

class User5 {
    gitHubToken: string;
    jwtToken: string;
}

interface AuthStrategy {
    auth(user: User5):boolean;
}

class Auth {
    constructor(private strategy: AuthStrategy) {}

    setStrategy(strategy: AuthStrategy) {
        this.strategy = strategy;
    }

    public authUser(user: User5): boolean {
        return this.strategy.auth(user);
    }
}

class JWTStrategy implements AuthStrategy {
    auth(user: User5): boolean {
        if (user.jwtToken) {
            // Go to API
            return true;
        }
        return false;
    }
}

class GitHubStrategy implements AuthStrategy {
    auth(user: User5): boolean {
        if (user.gitHubToken) {
            // Go to API
            return true;
        }
        return false;
    }
}

const user1 = new User5();
user1.jwtToken = 'token';
const auth2 = new Auth(new JWTStrategy());
console.log(auth2.authUser(user1))
auth2.setStrategy(new GitHubStrategy());
console.log(auth2.authUser(user1))