import { FaTrashAlt } from "react-icons/fa";

const Content = ( {items, handleCheckBox, handleDelete} ) => {

    return(
            <main> 
               <ul>  
                 {  items.map( 
                   
                    (item) => (
                  
                    <li className="item">
                    <input 
                    type="checkbox" 
                    checked={item.checked}
                    onChange={ () => handleCheckBox(item.id) }
                    />

                    {/*label item name*/} 
                    <label>
                     {item.itemName}   
                    </label>

                    {/*delete*/}
                    &nbsp; 
                    
                    <FaTrashAlt 
                     onClick={()=> handleDelete(item.id)}   
                     role="button"
                     aria-label={`Delete ${item.item} ` } 
                    />

                   </li>
                    )
                )}

               </ul>     
            </main>
    )

}

export default Content;