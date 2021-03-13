import React, { Component } from 'react'
import Loading from "../Loading"
export default class DynamicSearch extends Component {
    constructor(props){
        super(props)
        this.state={
            search:"",
            loading:true,
            list_of_items:[]
        }
        this.time_out=null;
        this.onChange=this.onChange.bind(this);
    }
    search=(word,list)=>{
        list.map((item) => {
          if (word === '') {
            item.class = 'hidden'
          } else if (
            encodeURIComponent(
              item.name
                .toLowerCase()
            ).search(
              encodeURIComponent(
                word
                  .toLowerCase()
              )
            ) < 0
          ) {
            item.class = 'hidden'
          } else {
            item.class = ''
          }
        return item
        })
        return [...list]
      
    }
    onChange(e){
        if(this.time_out){
            clearTimeout(this.time_out)
        }
        this.time_out=setTimeout(()=>{
            //Fetch the search from the server or database
            // For now we will use the countries list
            let list= this.search(this.state.search,this.props.list_of_items)
            console.log(list,this.state)
            this.setState({list_of_items:list,loading:false})
        },//What to execute when that time is up 
        1500)//How long do you want to wait till a user finish typing
        this.setState({loading:true,[e.target.name]:e.target.value})
    }
    render() {
        return (
            <div className="search-bar">
            <label> 
                {this.props.searchTitle}
                {/* {console.log(ref)} */}
                <input 
                type="text" 
                name="search" 
                value={this.state.search}
                placeholder={this.props.placeholder} 
                onChange={this.onChange}
                />

            </label>    
            <ul>
                {this.state.search && !this.state.loading?
                    this.state.list_of_items.map((i,index)=><li className={`${i.class}`} key={index}>{i.name}</li>)
                :null}
                {this.state.loading && this.state.search && <Loading />}
            </ul>
        </div>
        )
    }
}
