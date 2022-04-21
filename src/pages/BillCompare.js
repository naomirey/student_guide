import classes from './BillCompare.module.css';
import { Accordion } from 'react-bootstrap';

const BillCompare = () => {
    return(
        <div className={classes.page}>
            <Accordion >
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Gas Price</Accordion.Header>
                    <Accordion.Body>
                    <object data="https://www.consumercouncil.org.uk/sites/default/files/2022-02/Gas_Price_Comparison_Table_Ten_Towns_230222.pdf" type="application/pdf" width="100%" height="300px">
                        <p>Alternative text - include a link <a href="https://www.consumercouncil.org.uk/sites/default/files/2022-02/Gas_Price_Comparison_Table_Ten_Towns_230222.pdf">to the PDF!</a></p>
                    </object>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Electricity</Accordion.Header>
                    <Accordion.Body>
                    <h2>Electricity</h2>
                    <object data="https://www.consumercouncil.org.uk/sites/default/files/2022-03/electricity_price_comparison_table_010322.pdf" type="application/pdf" width="100%" height="300px">
                        <p>Alternative text - include a link <a href="https://www.consumercouncil.org.uk/sites/default/files/2022-03/electricity_price_comparison_table_010322.pdf">to the PDF!</a></p>
                    </object>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Economy 7</Accordion.Header>
                    <Accordion.Body>
                    <object data="https://www.consumercouncil.org.uk/sites/default/files/2022-02/economy_7_price_comparison_table_040222_0.pdf" type="application/pdf" width="100%" height="300px">
                        <p>Alternative text - include a link <a href="https://www.consumercouncil.org.uk/sites/default/files/2022-02/economy_7_price_comparison_table_040222_0.pdf">to the PDF!</a></p>
                    </object>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
            
        </div>
    )
}

export default BillCompare;