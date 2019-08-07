import React from 'react';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import Exam from './screens/Exam/Exam';
import WebServices from './WebServices/WebServices';
import styles from './App.module.scss';
import Table from './components/Table/Table';
import SimpleBarChart from './components/Chart/Chart';
import tablesmain from './resources/jsons/tablemain.json';

import produce from 'immer/dist/immer';

export default class App extends React.PureComponent {

  state = {
    url:"",
    datos:[],
    Exam:{name:"",temp:"",humedad:"",presion:""},
    headers:[]
  }
  onChange =(event)=> {
    const nextState = produce(this.state, (draft) => {
      draft.url = event.target.value;
      console.log("TCL: App -> nextState -> event.target.value", event.target.value)
    });
    this.setState(nextState);
  }

  getUrl = async () => {

    if( this.state.url ==="")
      return false;

    try {
      const response = await WebServices.getUrl({
        url:this.state.url
      });
      console.log('TCL: Home -> fetchData -> response', response);
      
      const nextState = produce(this.state, (draft) => {
        draft.Exam.name = response.name;
        draft.Exam.temp = response.main.temp;
        draft.Exam.humedad = response.main.humidity;
        draft.Exam.presion = response.main.pressure;
        
      });
      this.setState(nextState);
    } catch (e) {
      window.alert("El URL es incorrecto o hubo un error al consultar la URL");
      console.log('TCL: Home -> fetchData -> e', e);
    }

  }
  agregarDatos = ()=> {
    const nextState = produce(this.state, (draft) => {
      draft.datos = draft.datos.concat(draft.Exam);

    });
    this.setState(nextState);
  }
    render() {
      return (
        <div>
          <div className={styles.tablesmain}>
            <Input onChange={(event)=>this.onChange(event)} className={styles.input} />
            <p>
            <Button label={"Nuevo"} onClick={()=> this.agregarDatos()} />
            </p>
          </div>
          <div className={styles.opciones}>
            <ul className={styles.lista_opciones}>
              <li onClick={() => this.getUrl()}>By City Name</li>
              <li onClick={() => this.getUrl()}>By City Id</li>
              <li onClick={() => this.getUrl()}>By City Coordinates</li>
            </ul>
          </div>
          <div className ={styles.resultado}>
            <Exam data ={this.state.Exam}/>
          </div>


          <div>
            <Table headers={tablesmain} data={this.state.datos}></Table>
          </div>
          <div>
            <div>
              <SimpleBarChart newData={this.state.datos}
                label={"name"} llaves={["temp", "humedad","presion"]}
                fill={["rgba(200,0,0,.1)", "rgba(0, 200, 1, .3)"]}
                alto={250} ancho={800} />
            </div>
          </div>

        </div>
      );
    }
  }
