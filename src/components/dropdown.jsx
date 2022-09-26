import Dropdown from 'react-bootstrap/Dropdown';
import Images from '../assets/Icons/icons';
import '../assets/styles/style.css'

function DropdownTransaction() {
  return (
    <Dropdown className="dropdowns">
      <Dropdown.Toggle variant="primary" id="dropdown-basic" className='downCaret p-0 border-0 bg-transparent'>
        {/* <img src={Images.CaretDown} alt="" className='caretDownIcon'/> */}
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark" className="text-center">
        <Dropdown.Item href="#/action-1" style={{ color: '#03c703'}}>Approved</Dropdown.Item>
        <Dropdown.Item href="#/action-2" style={{ color: '#ff0000'}}>Cancel</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownTransaction;