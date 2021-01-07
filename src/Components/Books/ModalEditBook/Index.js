import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import "./ModalEditBook.css";

class ModalEditBook extends Component {
  constructor(props) {
    super(props);
    this.onBookUpdate = this.onBookUpdate.bind(this);
    this.deleteThisBook = this.deleteThisBook.bind(this);
  }
  state = {
    open: false,
    visibleView: false,
    newBookData: {
      tittle: "",
      price: "",
      genres: []
    }
  };

  componentDidMount() {
    const { bookSelected } = this.props;

    this.setState({ newBookData: bookSelected });
  }
  
  deleteThisBook() {
    const { handleDeleteBook, bookSelected } = this.props;
    handleDeleteBook(bookSelected.id);
    this.handleClose();
  }

  onBookUpdate(e) {
    const { handleModifyBook } = this.props;
    handleModifyBook(this.state.newBookData);
    this.handleClose();
  }

  updateInputValue(e) {
    console.log(e.target.value);
    const { newBookData } = this.state;
    this.setState({
      newBookData: {
        ...newBookData,
        [e.target.name]: e.target.value
      }
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { bookSelected } = this.props;

    return (
      <div className="editButton">
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <EditIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modify Book</DialogTitle>
          <DialogContent>
            <TextField
              id="tittle"
              label="Tittle"
              name="tittle"
              value={this.state.newBookData.tittle}
              onChange={evt => this.updateInputValue(evt)}
              margin="normal"
              fullWidth
            />
            <TextField
              id="authorName"
              label="Author Name"
              name="authorName"
              value={this.state.newBookData.authorName}
              onChange={evt => this.updateInputValue(evt)}
              margin="normal"
              fullWidth
            />
            <TextField
              id="publisherName"
              label="Publisher Name"
              name="publisherName"
              value={this.state.newBookData.publisherName}
              onChange={evt => this.updateInputValue(evt)}
              margin="normal"
              fullWidth
            />
            <TextField
              type="number"
              id="price"
              label="Price"
              name="price"
              value={this.state.newBookData.price}
              onChange={evt => this.updateInputValue(evt)}
              margin="normal"
              fullWidth
            />
            
            <TextField
              id="category"
              label="Category"
              name="category"
              value={this.state.newBookData.category}
              onChange={evt => this.updateInputValue(evt)}
              margin="normal"
              fullWidth
            />          
            <React.Fragment>
              <div >
                CoverImage :
              </div>
              <Card>
                <CardActionArea>
                {
                  this.state.newBookData.coverImage != '' ?
                    (<img className="cover" src={`${process.env.PUBLIC_URL}/img/${this.state.newBookData.coverImage}`} alt="Cover image" />)
                    : ''
                }
                </CardActionArea>
              </Card>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.deleteThisBook}
              id={bookSelected.id}
            >
              Delete Book
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onBookUpdate}
            >
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ModalEditBook;
