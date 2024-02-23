import './TransactionComponent.css';
function TransactionComponent({name, cost, type,category}){
 
    return(
        <div className={`item-${type}`}>
            <span className="name">{name}</span>
            <span>{category}</span>
            <span className="cost">{cost}Kč</span>
        </div>
    );
}
export default TransactionComponent