import * as React from 'react';
import styles from './Table.module.scss';
import CurrencyFormat from 'react-currency-format';


export default (class Table extends React.PureComponent {
    state = { };

    formatData = (data, type) => {
        switch (type) {
            case 'text':
                return data;
            case 'number':
                return data.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            case 'money':
                return <CurrencyFormat value={data} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />;
            default:
                return data;
        }
    };

    componentDidMount() { }
    
    calculateFooter = (data, item) => {
        switch (item.footer) {
            case 'sum':
                return data.reduce((acc, row) => (acc += parseFloat(row[item.value])), 0);
            default:
                return item.footer;
        }
    };

    render() {
        const { headers, data, caption } = this.props;
        return (
            <div className={styles.table_container}>
                <table className={styles.table} boder="0" cellSpacing="0">
                    <caption>{caption}</caption>
                    <thead>
                        <tr>
                            {headers.map((element, m) => {
                                return (
                                    <th key={m}>
                                        {element.name}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, i) => {
                                
                                return (
                                    <tr key={i}>
                                        {
                                            headers.map((header, n) => {
                                                return (
                                                    <td key={n} className={styles[header.format]}>
                                                        <span>
                                                            { this.formatData(item[header.value] , header.format )}
                                                        </span>
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr className={styles.footer_row}>
                            {headers.map((header, i) => {
                                
                                return (
                                    <td key={i} className={styles[header.format]}>
                                        <span>
                                            {this.formatData(  this.calculateFooter(data.summary, header), header.format) }
                                        </span>
                                    </td>);
                            })}
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
});
