import { useState } from 'react';
import Output from './Output';
import Button from './shared/Button';

function Content() {
  const [r1, setR1] = useState(0);
  const [r2, setR2] = useState(0);
  const [r3, setR3] = useState(0)
  const [tension, setTension] = useState(0)
  const [circuit, setCircuit] = useState('S');

  const [btnDisabled, setBtnDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null);

  const [output, setOutput] = useState(0);

  const handleChange = (event) => {
    const min = 1, max = 10000;

    switch(event.target.name) {
      case 'r1':
        setR1(parseFloat(validate(event, min, max)))
        break;
      case 'r2':
        setR2(parseFloat(validate(event, min, max)))
      break;
      case 'r3':
        setR3(parseFloat(validate(event, min, max)))
      break;
      case 'tension':
        setTension(parseFloat(validate(event, min, 12)))
      break;
      case 'circuits':
        setCircuit(event.target.value)
      break;
      default:
        handleReset()
      break;
    }

    // Show/Hide Submit Button //
    if ( r1 >= min && r1 < max ) {
      if ( r2 >= min && r2 < max ) {
        if ( r3 >= min && r3 < max ) {
          if ( tension >= min && tension <= 12 ) {
            setBtnDisabled(false)
            console.log('BtnDisabled:' + btnDisabled)
          }
          else {
            setBtnDisabled(true)
          }
        }
        else {
          setBtnDisabled(true)
        }
      }
      else {
        setBtnDisabled(true)
      }
    }
    else {
      setBtnDisabled(true)
    }
  }
  const validate = (event, min, max) => {
    if (event.target.value % 1 == 0) {
      if ( event.target.value >= min && event.target.value <= max ){
        setErrorMessage(null)
        return event.target.value
      }
      else {
        event.target.value = ''
        setErrorMessage(`ERROR: ${ event.target.name.charAt(0).toUpperCase() + event.target.name.slice(1) } Value is not Between ${ min } and ${ max }!`)
        return event.target.value = ''
      }
    }
    else {
      setErrorMessage(`ERROR: ${ event.target.name.charAt(0).toUpperCase() + event.target.name.slice(1) } Value can't be a float number!`)
      return event.target.value = 0
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    if ( r1 !== '' && r2 !== '' && r3 !== '' && tension !== '' && circuit !== '' ) {
      setOutput(1)
    }
    
    console.log(
      'R1:' + r1,
      '\nR2:' + r2,
      '\nR3:' + r3,
      '\nTension:' + tension,
      '\nCircuit:' + circuit
    )
  }
  const handleReset = () => {
    setOutput(0)
    setR1(0)
    setR2(0)
    setR3(0)
    setTension(0)
    setCircuit('S')
    setBtnDisabled(true)
    document.getElementById('r1').value = 0
    document.getElementById('r2').value = 0
    document.getElementById('r3').value = 0
    document.getElementById('tension').value = 0
    document.getElementById('circuits').value = 'S'
  }

  return (
  <div className="content">
    <p className="desc">Calculator of Equivalent Resistance, Power, Currents and Voltages over resistors R1, R2 and R3.</p>
    <form onSubmit={ handleSubmit } onReset={ handleReset }>
      {/* Resistors Input */}
      <div className="row">
        <label className="custom-field">
          <input
            type='number'
            id='r1'
            name='r1'
            min='1'
            max='9999'
            placeholder='Resistor 1'
            title='Value Between 1Ω and 9999Ω'
            required
            onChange={ handleChange }
          />
        </label>
        <label className="custom-field">
          <input
            type='number'
            id='r2'
            name='r2'
            min='1'
            max='9999'
            placeholder='Resistor 2'
            title='Value Between 1Ω and 9999Ω'
            required
            onChange={ handleChange }
          />
        </label>
        <label className="custom-field">
          <input
            type='number'
            id='r3'
            name='r3'
            min='1'
            max='9999'
            placeholder='Resistor 3'
            title='Value Between 1Ω and 9999Ω'
            required
            onChange={ handleChange }
          />
        </label>
      </div>
      <div className="row">
        <label className="custom-field">
          <input
            type='number'
            id='tension'
            name='tension'
            min='1'
            max='12'
            placeholder='Tension'
            title='Value Between 1V and 12V'
            required
            onChange={ handleChange }
          />
        </label>
      </div>
      <Output
        displayOutput={ output }
        circuit={ circuit }
        r1={ r1 }
        r2={ r2 }
        r3={ r3 }
        tension={ tension } />
      {/* Circuit Type Input */}
      <div className="row">
        <label className="custom-field">
          <select id='circuits' name="circuits" required onChange={ handleChange }>
            <option value='S'>Series</option>
            <option value='P'>Parallel</option>
            <option value='M1'>Combinations of Series and Parallel 1</option>
            <option value='M2'>Combinations of Series and Parallel 2</option>
          </select>
        </label>
      </div>
      { errorMessage && <div className='errormessage'> { errorMessage }</div>}
      {/* Submit and Reset Buttons */}
      <div className="row">
        <label className="custom-field">
          <Button type='submit' version='primary' isDisabled={ btnDisabled } >Submit</Button>
        </label>
        <label className="custom-field">
          <Button type='reset' version='secondary' >Reset</Button>
        </label>
      </div>
    </form>
  </div>
  )
}

export default Content