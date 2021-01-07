import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/blue";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { withStyles } from "@material-ui/core/styles";

import "./ModalNewBook.css";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  input: {
    display: "none"
  },
  title: {
    color: blue[800],
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center"
  },
  button: {
    color: blue[900],
    margin: 10
  }
});

class ModalNewBook extends Component {
  constructor(props) {
    super(props);
    this.handleBookAdd = this.handleBookAdd.bind(this);
  }
  state = {
    open: false,
    genresValue: [],
    mainState: "initial", // initial, uploaded
    imageUploaded: 0,
    selectedFile: null,
    newBookData: {
      price: '',
      tittle: '',
      category: '',
      authorName: '',
      publisherName: ''
    },

  };
  handleBookAdd(e) {
    const { handleNewBook } = this.props;
    const { newBookData, selectedFile } = this.state

    let newData = {
      ...newBookData,
      selectedFile
    }
    handleNewBook(newData);

    const bookReset = {
      price: '',
      tittle: '',
      category: '',
      authorName: '',
      publisherName: ''
    };
    this.setState({newBookData:bookReset})
    this.handleClose();
  }
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

  updateInputValue(e) {
    const { newBookData } = this.state;
    this.setState({
      newBookData: {
        ...newBookData,
        [e.target.name]: e.target.value
      }
    });
  }

  handleUploadClick = (event) => {
    const { handleNewBook } = this.props;

    const file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        imgSrc: [reader.result]
      });
    }.bind(this);

    this.setState({
      mainState: "uploaded",
      selectedFile: file,
      imageUploaded: 1
    });

  };

  renderInitialState() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <CardContent>
          <Grid container justify="center" alignItems="center">
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  }

  renderUploadedState() {
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
        <CardActionArea onClick={this.imageResetHandler}>
          <img width="100%" height="100%" src={this.state.imgSrc} />
        </CardActionArea>
      </React.Fragment>
    );
  }

  imageResetHandler = (event) => {
    console.log("Image reset called");
    this.setState({
      mainState: "initial",
      selectedFile: null,
      imageUploaded: 0,
      imgSrc: null
    });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className="addButton"
          onClick={this.handleClickOpen}>
          Add book<AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new book</DialogTitle>
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
              value={this.state.newBookData.value}
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
                Upload CoverImage :
                </div>
              <div className={classes.root}>
                <Card className={this.props.cardName}>
                  {(this.state.mainState == "initial" && this.renderInitialState()) ||
                    (this.state.mainState == "uploaded" &&
                      this.renderUploadedState())}
                </Card>
              </div>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={this.handleClose} >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleBookAdd}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// export default ModalNewBook;
export default withStyles(styles, { withTheme: true })(ModalNewBook);