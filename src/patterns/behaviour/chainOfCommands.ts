interface IMiddleware {
    next(mid: IMiddleware): IMiddleware;
    handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
    private nextMiddleware: IMiddleware | undefined;

    next(mid: IMiddleware): IMiddleware {
        this.nextMiddleware = mid;
        return mid;
    }

    handle(request: any) {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request);
        }
        return ;
    }
}

class AuthMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('AuthMiddleware');
        if (request.userId === 1) {
            return super.handle(request);
        }

        return { error: "you are not authorised"}
    }
}

class ValidateMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('ValidateMiddleware');
        if (request.body) {
            return super.handle(request);
        }

        return { error: "no body"}
    }
}

class Controller extends AbstractMiddleware {
    override handle(request: any) {
        console.log('Controller');

        return { success: request };
    }
}

const controller = new Controller();
const validate2 = new ValidateMiddleware();
const auth = new AuthMiddleware();

auth.next(validate2).next(controller);

console.log(auth.handle({
    userId: 1,
    body: 'I am Ok'
}))