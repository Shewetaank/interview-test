export class User { 
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

export class FormData { 
    minAge: number;
    maxAge: number;
    showErrors: boolean;

    constructor(minAge: number, maxAge: number, showErrors: boolean) {
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.showErrors = showErrors;
    }
}

export type CallableUserData = {
    refineSearch: (minAge: number, maxAge: number) => void;
}