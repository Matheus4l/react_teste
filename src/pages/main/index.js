import React, {Component} from 'react';
import Api from '../../services/App'
import { async } from 'q';
import apiStarWars from '../../services/App';
import './style.css';
import Button from 'react-bootstrap/Button';

export default class Main extends Component{

    state={
      planets:[],
      num  : 1
    };

    componentDidMount(){
        
        this.loadPlanets(this.state.num);
    };

    

    render(){
        const {planets}= this.state;
        return <div className='listProducts'>
                <article>
                   <strong>{planets.name}</strong>
                   <table class="table table-dark">
                   
                   <tbody>
                     <tr>
                       <th scope="row">1</th>
                       <td>População</td>
                       <td>{planets.population} Pessoas</td>
                     
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
                    <Button  onClick={this.proximo} variant="outline-primary">Proximo</Button>
                </article>
                
        </div>
        

        
    }

    proximo = ()=>{
      this.state.num +=1;
      this.loadPlanets( this.state.num);
    }
    loadPlanets= async(num)=>{

        const response =await apiStarWars.get('planets/'+num+'/');
        console .log(response.data);
         this.setState({planets: response.data})
       

    };
}