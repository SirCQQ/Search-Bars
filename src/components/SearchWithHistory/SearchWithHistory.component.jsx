import React, { Component } from 'react'
import { BiHistory } from "react-icons/bi"
import "./SearchWithHistory.style.css"
export default class SearchWithHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            list_of_items: [],
            list_of_hitory: this.props.history
        }
        this.time_out=null;
        this.onChange=this.onChange.bind(this)
    }

    search = (word, list) => {
        list.map((item) => {
            if (word === '') {
                item.class = 'hidden'
            } else if (
                encodeURIComponent(item.name.toLowerCase())
                    .search(
                        encodeURIComponent(word.toLowerCase())
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
     compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }
      
    onChange(e) {
        if (this.time_out) {
            clearTimeout(this.time_out)
        }
        let new_list = this.search(e.target.value, this.state.list_of_hitory)
        this.setState({ [e.target.name]: e.target.value, list_of_items: new_list })

        this.time_out = setTimeout(() => {
            //Fetch the search from the server or database
            // For now we will use the countries list
            let search_list = [
                ...this.search(this.state.search, this.props.list_of_items),
                ...this.search(e.target.value, this.state.list_of_hitory)
            ].sort(this.compare)
            //Creating a list of unique objects soo what we fetch from the server is not a dublicate 
            let uniqueObjects = [...new Map(search_list.map(item => [item.name, item])).values()]

            uniqueObjects = this.search(e.target.value, uniqueObjects.sort(this.compare))
            this.setState({ list_of_items: uniqueObjects })
        },//What to execute when that time is up 
            1500)//How long do you want to wait till a user finish typing

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
              {this.state.search
                ? this.state.list_of_items.map((i, index) => (
                    <li
                      className={`${i.class} ${
                        i.icon === "history" ? "history" : null
                      }`}
                      key={index}
                    >
                      {i.name}
                      {i.icon === "history" ? <BiHistory /> : null}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        );
    }
}
