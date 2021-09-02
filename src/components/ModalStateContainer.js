import * as React from 'react'

class ModalStateContainer extends React.Component {
  state = {
    isConfirmationOpen: false,
  }
  toggleConfirm = (open = !this.state.isConfirmationOpen, cb = () => {}) => {
    this.setState({isConfirmationOpen: open}, cb)
  }
  render() {
    return this.props.children({
      isConfirmationOpen: this.state.isConfirmationOpen,
      toggleConfirm: this.toggleConfirm,
    })
  }
}

export {ModalStateContainer}
