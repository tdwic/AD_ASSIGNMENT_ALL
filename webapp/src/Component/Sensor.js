import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import './Sensor.css';
import CardColumns from 'react-bootstrap/CardColumns'
import CardDeck from 'react-bootstrap/CardDeck'
import axios from "axios";

export default class Sensor extends Component{
    constructor(props) {
        super(props);
        this.state = {alarmSen: [] };
    }

    getData = () => {
        axios.get("http://localhost:5000/SensorAPI/alarmSen")
            .then((response)=>{
                const data = response.data;
                this.setState({alarmSen : data});
                console.log(this.state.alarmSen);
                console.log("Data Has Received");

            }).catch(() =>{
                alert("Error");
            });
    }


    componentDidMount() {
        this.getData();
        setInterval(this.getData, 20000);
    }

    render() {
        console.log(this.state.alarmSen);
        return (
            <div className ="cardList">

                <CardColumns >
                    {this.state.alarmSen.map((alarmSen) => {
                        return(alarmSen.smokeLvl > 5 || alarmSen.co2Lvl > 5) ? (
                            <Card text="white" bg = "danger" style={{ width: '18rem' }} key={alarmSen.id}>
                                <Card.Header><Card.Title>Sensor {alarmSen.id}</Card.Title></Card.Header>
                                <Card.Body>
                                    <Card.Title>Status: {alarmSen.activeStatus ? "Active" : "De-Active"}</Card.Title>
                                    <Card.Title>Floor Number: {alarmSen.floorNumber}</Card.Title>
                                    <Card.Title>Room Number: {alarmSen.roomNumber}</Card.Title>
                                    <Card.Title>Smoke Level: {alarmSen.smokeLvl}</Card.Title>
                                    <Card.Title>CO2 Level: {alarmSen.co2Lvl}</Card.Title>
                                </Card.Body>
                            </Card>
                            ) : (
                            <Card  text="white"  bg = "success" style={{ width: '18rem' }} key={alarmSen.id}>
                                <Card.Header><Card.Title>Sensor {alarmSen.id}</Card.Title></Card.Header>
                                <Card.Body>
                                    <Card.Title>Status: {alarmSen.activeStatus ? "Active" : "De-Active"}</Card.Title>
                                    <Card.Title>Floor Number: {alarmSen.floorNumber}</Card.Title>
                                    <Card.Title>Room Number: {alarmSen.roomNumber}</Card.Title>
                                    <Card.Title>Smoke Level: {alarmSen.smokeLvl}</Card.Title>
                                    <Card.Title>CO2 Level: {alarmSen.co2Lvl}</Card.Title>
                                </Card.Body>
                            </Card>
                        )})};
                </CardColumns>
            </div>
        );
    }
}
