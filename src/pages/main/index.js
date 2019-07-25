import React, {Component} from 'react';
import Api from '../../services/App'
import { async } from 'q';
import apiStarWars from '../../services/App';
import './style.css';


export default class Main extends Component{

    state={
      planets:[]
    };

    componentDidMount(){

        this.loadPlanets('3');
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
                       <td>{planets.population}</td>
                     
                     </tr>
                     <tr>
                       <th scope="row">2</th>
                       <td>Clima</td>
                       <td>{planets.climate}</td>
                       
                     </tr>
                     <tr>
                       <th scope="row">3</th>
                       <td>Diamentro</td>
                       <td>{planets.diameter}</td>
                      
                     </tr>
                   </tbody>
                 </table>
                </article>
        </div>
    }


    loadPlanets= async(num)=>{
        console .log('o');
        const response =await apiStarWars.get('planets/'+num+'/');
        console .log(response.data);
         this.setState({planets: response.data})
       

    };
}