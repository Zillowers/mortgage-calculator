import React from 'react';
import SubSection from './SubSection.jsx';
import MortgageSection from './MortgageSection.jsx';
import styles from './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValues: {},
      payments: {},
      paymentsPercentage:{},
      open: false,
      popUpStatus: {
        pmiBlock: false,
        taxBlock: false,
        insuranceBlock: false,
        hoaBlock: false
      },
      checked:{
        pmiChecked: true,
        taxesChecked: true,
      },
      selected: '30-year fixed',
    };
    this.handleCollapse = this.handleCollapse.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.calculatePayments = this.calculatePayments.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePopUp = this.handlePopUp.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    let path = window.location.pathname.split('/');
    let id= path[path.length-2];
    fetch(`/api/homes/${id}/prices`, {
      headers: {
        'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then((res) => {
        res[0].down_payment_percentage = 20;
        res[0].property_tax_percentage = ((res[0].property_tax / res[0].home_price) * 100).toFixed(2);
        res[0].down_payment_amount = Math.floor(res[0].home_price * res[0].down_payment_percentage / 100);
        res[0].interest_rate = 4.5;
        res[0].years = 30;
        res[0].PMI = 0;
        this.setState({
          currentValues: res[0],
        }, () => {
          this.calculatePayments();
        });
      })
      .catch(err => console.log(err));
  }

  calculatePayments() {
    let homePrice = this.state.currentValues.home_price;
    let propertyTax = Math.round(this.state.currentValues.property_tax/12);
    let homeInsurance = Math.round(this.state.currentValues.home_insurance/12);
    let hoaDues = this.state.currentValues.hoa_dues;
    let downPaymentAmount = this.state.currentValues.down_payment_amount;
    let interestRate = this.state.currentValues.interest_rate;
    let years = this.state.currentValues.years;
    let downPaymentPercentage = this.state.currentValues.down_payment_percentage;

    let loanAmount = homePrice - downPaymentAmount;
    let perMonthInterest = interestRate/1200;
    let numberOfPayments = years * 12;
    let monthlyPandI = 0;

    if (interestRate > 0) {
      monthlyPandI = loanAmount * (perMonthInterest * (Math.pow((1 + perMonthInterest), numberOfPayments))) / (Math.pow((1 + perMonthInterest), numberOfPayments) - 1);
    } else {
      monthlyPandI = loanAmount/numberOfPayments;
    }
    let roundedMonthlyPandI = Math.round(monthlyPandI);
    let newPMI = 0;

    if (downPaymentPercentage < 20 && this.state.checked.pmiChecked) {
      const pmiPrice = 50;
      newPMI = Math.round(loanAmount/100000)*pmiPrice;
    }

    let monthlyPayment = roundedMonthlyPandI+ propertyTax + homeInsurance + hoaDues + newPMI;
    let PIPercentage = Math.round((roundedMonthlyPandI/monthlyPayment)*100);
    let pmiPercentage = Math.round((newPMI/monthlyPayment)*100);
    let HOA = Math.round((this.state.currentValues.hoa_dues/monthlyPayment)*100);
    let insurancePercentage = Math.round((homeInsurance/monthlyPayment)*100);
    let taxes = Math.round((propertyTax/monthlyPayment)*100);

    if (!this.state.checked.taxesChecked) {
      monthlyPayment = roundedMonthlyPandI + hoaDues + newPMI;
      insurancePercentage = 0;
      taxes = 0;
    }

    const paymentObj = {
      PI: roundedMonthlyPandI,
      insurance: homeInsurance,
      taxes: propertyTax,
      PMI: newPMI,
      HOA: this.state.currentValues.hoa_dues,
      monthlyPayment : monthlyPayment,
    };

    const paymentPercentageObj = {
      PI: PIPercentage,
      insurance: insurancePercentage,
      taxes: taxes,
      PMI: pmiPercentage,
      HOA: HOA,
    };
    this.setState({
      payments: paymentObj,
      paymentsPercentage: paymentPercentageObj
    }, () => {
      this.formatCurrency();
    });
  }

  formatCurrency() {
    const payments = Object.assign({}, this.state.payments);
    for (const key in payments) {
      payments[key] = payments[key].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      });
    }
    this.setState({
      payments: payments
    });
  }

  toggleClass() {
    const item = document.getElementsByClassName('fas');
    if (this.state.open === true) {
      item[0].classList.remove('fa-angle-down');
      item[0].classList.add('fa-angle-up');
    } else {
      item[0].classList.add('fa-angle-down');
      item[0].classList.remove('fa-angle-up');
    }
  }

  handleCollapse() {
    this.setState({
      open: !this.state.open,
    }, () => this.toggleClass());
  }

  handleChange(e) {
    const targetName = e.target.name;
    let targetValue = e.target.value;
    const currentValues = Object.assign({}, this.state.currentValues);

    if (targetValue === '') {
      targetValue = 0;
    }

    if (targetName !== 'loan_program') {
      targetValue = parseFloat(targetValue);
    }

    if (targetValue.toString().length > 9) {
      targetValue = 0;
      alert('invalid input');
    }

    if (targetName !== 'home_price' &&  targetValue > this.state.currentValues.home_price) {
      targetValue = 0;
      alert('invalid input');
    }

    if (targetName === 'home_price') {
      currentValues.down_payment_amount = Math.floor(targetValue*(this.state.currentValues.down_payment_percentage/100));
    }
    if (targetName === 'down_payment_percentage') {
        currentValues.down_payment_amount = Math.floor(this.state.currentValues.home_price * targetValue / 100);
    } else if (targetName === 'down_payment_amount') {
      if (currentValues.down_payment_amount = 0){
        currentValues.down_payment_percentage = 0;
      } else {
        currentValues.down_payment_percentage = ((targetValue / this.state.currentValues.home_price) * 100).toFixed(0);
      }
    } else if (targetName === 'property_tax') {
        currentValues.property_tax_percentage = ((targetValue / this.state.currentValues.home_price) * 100).toFixed(2);
    } else if (targetName === 'property_tax_percentage') {
        currentValues.property_tax = Math.floor(this.state.currentValues.home_price * targetValue / 100);
    }
    currentValues[targetName] = targetValue;
    this.setState({
      currentValues,
    }, () => this.calculatePayments());
  }

  handlePopUp(e) {
    let {id} = e.currentTarget.children[0];
    if(id === 'help1'){
      id = 'pmiBlock';
    }else if(id === 'help2'){
      id = 'taxBlock';
    }else if(id === 'help3'){
      id = 'insuranceBlock';
    }else if(id === 'help4'){
      id = 'hoaBlock'
    }
    let popUpStatus = Object.assign({}, this.state.popUpStatus);
    for(let key in popUpStatus){
      popUpStatus[key] = false;
    }
    popUpStatus[id] = !this.state.popUpStatus[id];
    this.setState({
      popUpStatus: popUpStatus
    });
  }

  handleSelectChange(e) {
    let currentValues = Object.assign({}, this.state.currentValues);
    if (e.target.value === "15-year fixed") {
      currentValues.years= 15
    } else if (e.target.value === "30-year fixed") {
      currentValues.years= 30
    } else {
      currentValues.years= 25
    }
    this.setState({
      selected : e.target.selected,
      currentValues : currentValues
    }, () => this.calculatePayments());
  }

  handleCheckbox(e) {
    const checkedEl = e.target.id;
    const checked = Object.assign({}, this.state.checked);
    if (checkedEl === 'pmi-check') {
        checked.pmiChecked= !checked.pmiChecked
    } else {
        checked.taxesChecked= !checked.taxesChecked
    }
    this.setState({
      checked : checked
    }, ()=> this.calculatePayments());
  }

  render() {
    return (
      <main className={[styles.zlwLayoutLg, styles.zlwLayoutCenter].join(' ')}>
        <div>
          <section className={[styles.mainCol, styles.zlwLg].join(' ')}>
            <MortgageSection onClick={this.handleCollapse} />
            {this.state.open === true ?
              <SubSection items={this.state.currentValues} payments={this.state.payments} paymentsPercentage={this.state.paymentsPercentage}
                          onChangeHandler={this.handleChange}
                          onClick={this.handlePopUp} selectedValue={this.state.selected} onSelectChange={this.handleSelectChange} checked={this.state.checked} onCheckHandler={this.handleCheckbox} popStatus={this.state.popUpStatus}/> : null}
          </section>
        </div>
      </main>
    );
  }
}

export default App;