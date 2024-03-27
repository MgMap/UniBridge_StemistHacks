//Create a User object
class User {
    constructor(username = '', email = '', dobDay = 0, dobMonth = 0, dobYear = 0, password = '', login = true) {
        this.username = username;
        this.email = email;
        this.dob_day = dobDay;
        this.dob_month = dobMonth;
        this.dob_year = dobYear;
        this.password = password;
        this.login = true;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getDobDay() {
        return this.dob_day;
    }

    setDobDay(dobDay) {
        this.dob_day = dobDay;
    }

    getDobMonth() {
        return this.dob_month;
    }

    setDobMonth(dobMonth) {
        this.dob_month = dobMonth;
    }

    getDobYear() {
        return this.dob_year;
    }

    setDobYear(dobYear) {
        this.dob_year = dobYear;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }
}
