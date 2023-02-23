import classes from './ModalComponent.module.css'

const ModalComponent = (props) => {

  const closeModalHandler = (event) => {
    if (event.target === event.currentTarget) {
      props.closeModal()
    }
  }

  return (
    <div className={classes.modal} onClick={closeModalHandler}>
      <div className={classes['modal-content']}>
      <span className="d-flex justify-content-center"> 
          <button onClick={() => props.closeModal()} className="btn btn-outline-light rounded-circle">
          <i className="bi bi-x" ></i>
          </button>
      </span>
         
      <h3>{props.modalTitle}</h3>
        {props.children}
      
      </div>
    </div>
  )
}

export default ModalComponent