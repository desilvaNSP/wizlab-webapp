import React, { Component } from 'react'
import '../custom/custom.css'
import downIcon from '../custom/icons/down.svg'
import upIcon from '../custom/icons/up.svg'

class DropdownInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: '',
      dropList:[]
    }
    this.close = this.close.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    const { listOpen } = this.state
    
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close)
      }
      else {
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close)
  }
  componentDidMount(){
    this.setState({
        dropList:this.props.list
    })
  }

  close(timeOut) {
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id, stateKey) {
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.resetThenSet(id, stateKey))
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
      dropList:this.props.list
    }))
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.title !== prevState.title) {
      return {
        headerTitle: nextProps.title,
        headerTitle: nextProps.title
      };
    }
    return null;
  }

  handleChange(event) {

    console.log(this.state.dropList)
    let filterd = this.props.list.filter(function (value, index, arr) {
        return value.description.toLowerCase().includes(event.target.value.toLowerCase());
    });
    this.setState({
        dropList: filterd
    })
    //const result = this.state.dropList.filter(word => word.includes(event.target.value));
    console.log(filterd);
  }

  render() {
    const { list } = this.props
    
    const { listOpen, headerTitle } = this.state
    console.log("header title",headerTitle)
    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          {/* <div className="dd-header-title">{headerTitle}</div> */}
          {headerTitle == "Select Language" || headerTitle == "Name" || headerTitle == "Add Date" || headerTitle == "Select Country"
           ? <input disabled={true} className="fm-input-local-record" type="text" placeholder={headerTitle}></input> 
           : <div className="dd-header-title">{headerTitle}</div>
          }
          {listOpen
            ? <img src={upIcon}></img>
            : <img src={downIcon}></img>
          }
        </div>
        {listOpen && <ul className="dd-list-input" onClick={e => e.stopPropagation()}>
        <input className="dd-input" type="text" placeholder="Search" name="Search" onChange={this.handleChange} ></input>
          {this.state.dropList.map((item) => (
            <li className="dd-list-item" style={{ color: item.selected? '#6F9C07': '#383838'}} key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected }</li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default DropdownInput