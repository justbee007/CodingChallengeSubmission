import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from '@mui/material';
import { postData } from "./lookupService";
import './Lookup.css';
import { getzipcodes } from "./getZipCodeService";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from "@material-ui/core/DialogContentText";
export class Lookup extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Name: "",
            zipCode: "",
            county: "",
            population: "",
            pigLatinName: "",
            outputVal: "",
            zipCodeErrorVal: "",
            nameErrorVal: "",
            filterZipcode: [],
            open: false
        }

    }

    validName(e) // Checks whether the input name is in valid format or not. Data validation
    {
        this.setState({ outputVal: "" })
        this.setState({ Name: e.target.value });
        let nameVal = e.target.value.split(" ");
        let nameregex = /^[a-zA-Z\s]+$/;
        if (nameVal.length !== 2 || nameregex.test(e.target.value) === false) {
            this.setState({ nameErrorVal: "Please enter a valid Name" });
        }
        else {
            console.log(nameVal[0]);
            if (nameVal[0].length === 0 || nameVal[1].length === 0) {
                this.setState({ nameErrorVal: "Please enter a valid Name" });
            }

            else {
                this.setState({ nameErrorVal: "" });
            }
        }
    }
    validZipCode(e)  //Check if Entered Zipcode is valid
    {
        if (e.target.value > 3) {
            let list = this.state.zipcodeslist.filter(el => el.startsWith(e.target.value) !== false);
            this.setState({ filterZipcode: list });
        }


        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
        if (zipCodePattern.test(e.target.value) === false) {
            this.setState({ zipCodeErrorVal: "Please enter a valid Zip Code" });
        }
        else {
            this.setState({ zipCodeErrorVal: "" });
        }
    }

    handleToClose() // Handling opening and closing of dialog box
    {
        this.setState({ open: false });
    }

    async onSearch(e) //Onsubmit function for Search for county name in database or show messages accordingly
    {
        e.preventDefault();
        if (this.state.nameErrorVal === "" && this.state.zipCode !== "" && this.state.Name !== "" && this.state.zipCode !== null) {
            let personName = this.state.Name;
            let zipCode = this.state.zipCode;
            let postVal = { "name": personName, "zipcode": zipCode }
            postVal = JSON.stringify(postVal)

            postData(postVal).then(data => { // Service call to obtain the county,population and translation of the name
                this.setState({ open: true })
                this.setState({
                    outputVal: <div className="outputdiv">{data.name}’s zip code is in {data.county} County and has a population
                        of {(data.population).toLocaleString("en-US")}</div>
                })

            })

            this.setState
                ({
                    Name: "",
                    county: "",
                    population: "",
                    pigLatinName: "",
                    zipCodeErrorVal: "",
                    nameErrorVal: "",
                    filterZipcode: []

                });
        }
        else if (this.state.Name === "") {
            this.setState({ nameErrorVal: "Name field cannot be empty" })
        }
        else if (this.state.zipCode === "") {
            this.setState({ zipCodeErrorVal: "Zip code cannot be empty" })
        }
    }
    async componentDidMount() {
        this.setState({ zipcodeslist: await (getzipcodes()) }); // Service call to obtain all the zipcodes on creation of the component
    }

    render() {
        return (
            <div className="searchBox">
                <Typography variant="h3" display="block" component="div" gutterBottom align='center'>
                    Lookup County and Population
                </Typography>

                <form onSubmit={this.onSearch.bind(this)}>

                    <TextField id="outlined-basic" value={this.state.Name} label=" Enter Name" variant="outlined" onChange={this.validName.bind(this)} helperText={this.state.nameErrorVal} />

                    <div className="searchbar">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={this.state.filterZipcode}
                            onChange={(event, value) => {
                                console.log(value)
                                this.setState({ zipCode: value });
                            }}
                            style={{
                                margin: "0 auto",
                                maxWidth: 220

                            }}
                            renderInput={(params) => <TextField {...params} value={this.state.zipCode} label=" Enter your ZipCode" variant="outlined" onChange={this.validZipCode.bind(this)} />}
                        />
                    </div>
                    <Box padding='30px'>
                        <Button sx={{ padding: '10px ' }} type="submit" variant="contained" color="primary">Search</Button>
                    </Box>


                </form>
                <Dialog open={this.state.open}>
                    <DialogTitle> Your County and the Population is...</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.outputVal}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToClose.bind(this)} color="primary" autoFocus>Close</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}
