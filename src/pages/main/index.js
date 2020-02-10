import React, {Component} from 'react';
import Api from '../../services/App'
import { async } from 'q';
import apiStarWars from '../../services/App';
import './style.css';
import {Button,Pagination,Spinner} from 'react-bootstrap';
import NumberFormat from 'react-number-format';

export default class Main extends Component{

    state={
      planets:[],
      num  : 1,
      loading:false,
      messagem:"Loading..."
    };

    componentDidMount(){
        
        this.loadPlanets(this.state.num);
    };

    

    proximo = ()=>{
      this.state.num +=1;
      
      this.setState({loading: false})
      this.loadPlanets( this.state.num);
    };

    anterior = ()=>{
      if(this.state.num > 1){
            this.state.num -=1;
        }
      this.setState({loading: false})
      this.loadPlanets( this.state.num);
    };

    loadPlanets= async(num)=>{
          try{
              const response =await apiStarWars.get('planets/'+num+'/');
              if(response.data.population==="unknown"){
                response.data.population=0;
              }
              this.setState({planets: response.data})
              this.setState({loading: true})
          }catch(erro){

            this.setState({messagem: 'Ops! Tente mais tarde'})

          }
                   
    };

    tabela =()=>{
      const {planets,loading,messagem}= this.state;
      if(loading===false){
        
        return(  <Button variant="warning" disabled>
                    <Spinner as="span"animation="grow"size="sm"role="status"aria-hidden="true"/>
                      {messagem}
                 </Button>)
      }else{
        return( <div>
                <strong style ={{fontSize:20}}>Planeta</strong>
                <strong>{planets.name}</strong>
                <table class="table table-dark">
                  <tbody>
                      <tr>
                          <th scope="row">1</th>
                          <td>População</td>
                          <td><NumberFormat value={planets.population} displayType={'text'} thousandSeparator={true} /> </td>
                      </tr>
                      <tr>
                          <th scope="row">2</th>
                          <td>Clima</td>
                          <td>{planets.climate}</td>
                      </tr>
                      <tr>
                          <th scope="row">3</th>
                          <td>Diamentro</td>
                          <td>{planets.diameter} Km</td>                                
                      </tr>
                      <tr>
                          <th scope="row">4</th>
                          <td> Período de rotação</td>
                          <td>{planets.rotation_period}Horas</td>
                      </tr>
                      <tr>
                          <th scope="row">4</th>
                          <td> Período orbital </td>
                          <td>{planets.orbital_period} Dias</td>
                      </tr>
                      <tr>
                          <th scope="row">4</th>
                          <td> Agua da superfície </td>
                          <td>{planets.surface_water}%</td>       
                      </tr>
                  </tbody>
              </table>
            </div>
        )
      }
    }

    render(){
      
      return <div className='listPlanets'>
                <h1>Informações Sobre Os Planetas</h1>
                <div className="button">
                      <Button   onClick={this.anterior} variant="outline-warning">Anterior</Button>
                      <Button  onClick={this.proximo} variant="outline-warning" >Proximo</Button>
                </div>     
                <Pagination>
                    <Pagination.Item >Pagina:{this.state.num}</Pagination.Item> 
                </Pagination>
                <article>
                    {this.tabela()}
                </article>
              </div>
    };

}
