import React ,{useState}from 'react'


export default function StaticSearch({searchTitle,placeholder,list_of_items}) {
    const [value,setValue]=useState("")
    const [items,setItems]=useState(list_of_items)
    
    const  search=(event,list)=>{
        let word = event.target.value
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
    
    const onChange=(e)=>{
        setValue(e.target.value);
        setItems(search(e,items))
    }
    return (
        <div className="search-bar">
            <label> 
                {searchTitle}
                <input 
                type="text"
                className="search-bar-input"
                placeholder={placeholder} 
                onChange={onChange}
                value={value}/>
            </label>    
            <ul>
                {
                value?
                    items.map((i,index)=><li className={`${i.class}`}key={index}>{i.name}</li>)
                :null
                }
            </ul>
        </div>
    )
}