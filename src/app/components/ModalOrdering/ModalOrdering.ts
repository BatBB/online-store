import Component from '../Component';
import './modalOrdering.scss';

class ModalOrdering extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private isNumber = (key: string) => /\d/.test(key); //проверка ввода на цифры

    private inputNumber(className: string) {
        const input = <HTMLInputElement>this.container.querySelector(className);

        if (input) {
            input.addEventListener('keydown', (ev: KeyboardEvent) => {
                if (this.isNumber(ev.key) || ev.key === 'Backspace') {
                    if (className === '.pay-form__creditcard-num')
                        if (input.value.length % 5 === 4 && input.value.length < 19 && ev.key !== 'Backspace') {
                            input.value += ' ';
                        } else {
                            if (input.value.at(-1) === ' ') {
                                input.value = input.value.slice(0, -1);
                            }
                        }
                } else {
                    ev.preventDefault();
                }
            });
        }
    }

    private renderModal() {
        const payFormTemplate = `
        <form action="" class=pay-form>
        <h3 class="pay-form-title">Pay form</h3>
        <input class="pay-form-name" type="text" placeholder="Name" required />
        <input class="pay-form-phone" type="tel" placeholder="Phone number" maxlength="15" required />
        <input class="pay-form-address" type="text" placeholder="Address" required />
        <input class="pay-form-email" type="email" placeholder="E-Mail" required />
        <div class="pay-form__creditcard">
            <h3 class="pay-form__creditcard-title">Credit card</h3>
            <div class="pay-form__creditcard-data">
                <div class="pay-form__creditcard-field">
                    <label for="cardnumber">Credit card number</label>
                    <input
                        class="pay-form__creditcard-num"
                        id="cardnumber"
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxlength="19"
                        size="20"
                        required
                    />
                </div>
                <div class="pay-form__creditcard-field">
                    <label for="expiration-month">Month</label>
                    <select id="expiration-month">
                        <option></option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    <label for="expiration-year">Year</label>
                    <select id="expiration-year">
                        <option></option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                    </select>
                </div>
                <div class="pay-form__creditcard-field">
                    <label for="CVV">CVV</label>
                    <input
                        class="pay-form__creditcard-cvv"
                        id="cvv"
                        type="tel"
                        placeholder="CVV"
                        maxlength="3"
                        minlength="3"
                        size="3"
                        required
                    />
                </div>
            </div>
        </div>
        <input class='pay-form-btn' type="submit" value="Confirm and Pay" />
        </form>`;

        this.container.innerHTML = payFormTemplate;
    }

    render() {
        this.renderModal();
        this.inputNumber('.pay-form-phone');
        this.inputNumber('.pay-form__creditcard-num');
        this.inputNumber('.pay-form__creditcard-cvv');
        return this.container;
    }
}

export default ModalOrdering;
