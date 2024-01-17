// Pattern factory

interface IInsurance {
    id: number;
    status: string;
    setVehicle(vehicle: any): void;
    submit(): Promise<boolean>;
}

class TFInsurance implements IInsurance {
    id: number = 0;
    status: string = '';
    private vehicle: any;

    setVehicle(vehicle: any) {
        this.vehicle = vehicle;
    }

    async submit(): Promise<boolean> {
        const res = await fetch('', {
            method: 'POST',
            body: JSON.stringify({ vehicle: this.vehicle })
        });
        const data = await res.json();

        return data.isSuccess;
    }
}

class ABInsurance implements IInsurance {
    id: number = 0;
    status: string = '';
    private vehicle: any;

    setVehicle(vehicle: any) {
        this.vehicle = vehicle;
    }

    async submit(): Promise<boolean> {
        const res = await fetch('', {
            method: 'POST',
            body: JSON.stringify({ vehicle: this.vehicle })
        });
        const data = await res.json();

        return data.isSuccess;
    }
}

abstract class InsuranceFactory {
    db: any;
    abstract createInstance(): IInsurance;

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

class TFInsuranceFactory extends InsuranceFactory {
    createInstance(): IInsurance {
        return new TFInsurance();
    }
}

class ABInsuranceFactory extends InsuranceFactory {
    createInstance(): ABInsurance {
        return new ABInsurance();
    }
}

const tfInsuranceFactory = new TFInsuranceFactory();
const ins = tfInsuranceFactory.createInstance();
tfInsuranceFactory.saveHistory(ins);

const INSURANCE_TYPE = {
    tf: TFInsurance,
    aab: ABInsurance
}

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt {
    db: any;
    createInsurance<T extends keyof IT>(type: T): IT[T] {
        return INSURANCE_TYPE[type];
    };

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

const insuranceFactoryAlt = new InsuranceFactoryAlt();
const ins2 = new (insuranceFactoryAlt.createInsurance(('tf')))