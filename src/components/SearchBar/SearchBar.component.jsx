import React, { Component } from 'react'

export default class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state={
            search:''
        }
        this.ref=React.createRef();
    }
onChange(e){
    this.setState({[e.target.name]:e.target.value})
}

    render() { 
        return (
            <div className="search-bar">
            <label> 
                {this.props.searchTitle}
                {/* {console.log(ref)} */}
                <input type="text" name="search"  ref={this.ref} placeholder={this.props.placeholder} onChange={e=>{this.props.onChange(e);this.onChange(e)}}/>
            </label>    
            <ul>
                {/* {console.log(this.ref)} */}
                {this.state.search?
                    this.props.list_of_items.map((i,index)=><li key={index}>{i}</li>)
                :null}
            </ul>
        </div>
        )
    }
}
